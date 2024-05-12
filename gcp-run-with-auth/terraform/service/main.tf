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
  provider  = google-beta
  project  = var.project

  name      = "maindb"
  instance  = google_sql_database_instance.default.name
}

resource "google_sql_user" "default" {
  provider  = google-beta
  project  = var.project

  instance = google_sql_database_instance.default.name
  # host     = "%" # note: only support MySQL
  name     = "admin"
  password = "password" # todo: use secret.variable
}
