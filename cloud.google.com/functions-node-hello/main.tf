resource "google_storage_bucket" "default" {
  name                        = "gcp-tutorial-gcf-source"
  location                    = "US"
  uniform_bucket_level_access = true
}
