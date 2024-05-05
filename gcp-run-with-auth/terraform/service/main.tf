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