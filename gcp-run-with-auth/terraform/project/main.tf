terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

provider "google" {
  project = var.project
  zone    = var.zone
}

resource "google_storage_bucket" "default" {
  name                        = "gcp-tutorial-gcf-source"
  location                    = "US"
  uniform_bucket_level_access = true
}
