terraform {
  required_providers {
    # google = {
    #   source  = "hashicorp/google"
    #   version = "4.51.0"
    # }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "4.84.0"
    }
  }
}

# provider "google" {
#   project = var.project
#   zone    = var.zone
# }
provider "google-beta" {
  billing_project       = var.project
  region                = var.zone
  user_project_override = true
}

resource "google_identity_platform_config" "default" {
  provider                   = google-beta
  project                    = var.project
  autodelete_anonymous_users = true

  sign_in {
    allow_duplicate_emails = false

    anonymous {
      enabled = true
    }

    email {
      enabled           = true
      password_required = true
    }
  }
}

resource "google_firebase_web_app" "default" {
  provider     = google-beta
  project      = var.project
  display_name = "sandbox-web-1"
}

data "google_firebase_web_app_config" "default" {
  provider   = google-beta
  web_app_id = google_firebase_web_app.default.app_id
  project    = var.project
}

output "firebase_api_key" {
  value = data.google_firebase_web_app_config.default.api_key
}

output "firebase_auth_domain" {
  value = data.google_firebase_web_app_config.default.auth_domain
}

output "firebase_app_id" {
  value = google_firebase_web_app.default.app_id
}

output "firebase_storage_bucket" {
  value = data.google_firebase_web_app_config.default.storage_bucket
}

// db
resource "google_sql_database_instance" "default" {
  provider = google-beta
  project  = var.project
  region   = var.region

  name             = "sandbox-db-1"
  database_version = "POSTGRES_15"
  settings {
    tier = "db-f1-micro"
  }

  deletion_protection = true
}

resource "google_sql_database" "default" {
  provider = google-beta
  project  = var.project

  name     = "maindb"
  instance = google_sql_database_instance.default.name
}

resource "google_sql_user" "default" {
  provider = google-beta
  project  = var.project

  instance = google_sql_database_instance.default.name
  # host     = "%" # note: only support MySQL
  name     = "admin"
  password = "password" # todo: use secret.variable
}

// app
resource "google_cloud_run_v2_service" "default" {
  provider = google-beta
  project  = var.project
  location = var.region

  name    = "sandbox-service-1"
  ingress = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "us-east1-docker.pkg.dev/${var.project}/backend-nodejs-graphql/app:0.1" // todo: use variable
    }

    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = [google_sql_database_instance.default.connection_name]
      }
    }
  }
}

# note: resource is publicly accessible and restricted within the application
data "google_iam_policy" "default" {
  provider = google-beta

  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "default" {
  provider = google-beta
  location = google_cloud_run_v2_service.default.location
  project  = google_cloud_run_v2_service.default.project
  service  = google_cloud_run_v2_service.default.name

  policy_data = data.google_iam_policy.default.policy_data
}

// storage
resource "google_storage_bucket" "default" {
  provider                    = google-beta
  project                     = var.project
  name                        = "linnefromice-sandbox-storage-1"
  location                    = "US"
  uniform_bucket_level_access = true
}

resource "google_firebase_storage_bucket" "default" {
  provider  = google-beta
  project   = var.project
  bucket_id = google_storage_bucket.default.id
}
