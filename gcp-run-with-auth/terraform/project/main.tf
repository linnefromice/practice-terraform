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

provider "google-beta" {
  billing_project       = var.project
  region                = var.zone
  alias                 = "no_user_project_override"
  user_project_override = false
}

resource "google_project_service" "default" {
  provider = google-beta.no_user_project_override
  project  = var.project
  for_each = toset([
    "cloudbilling.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "firebase.googleapis.com",
    # Enabling the ServiceUsage API allows the new project to be quota checked from now on.
    "serviceusage.googleapis.com",
  ])
  service = each.key

  # Don't disable the service if the resource block is removed by accident.
  disable_on_destroy = false
}

resource "google_firebase_project" "default" {
  provider = google-beta
  project  = var.project
}
