resource "google_storage_bucket" "default" {
  name                        = "bucket-for-cloudfunctions"
  location                    = "US"
  uniform_bucket_level_access = true
}

data "archive_file" "default" {
  type        = "zip"
  source_dir  = "libs/__artifacts/functions"
  output_path = "tmp/source.zip"
}

resource "google_storage_bucket_object" "default" {
  name   = "source.zip"
  bucket = google_storage_bucket.default.name
  source = data.archive_file.default.output_path
}

resource "google_cloudfunctions2_function" "default" {
  name     = "gcf-mailchimp-customer-from-bq"
  location = "us-central1"

  build_config {
    runtime     = "nodejs20"
    entry_point = "entry"
    source {
      storage_source {
        bucket = google_storage_bucket.default.name
        object = google_storage_bucket_object.default.name
      }
    }
  }

  service_config {
    max_instance_count = 1
    available_memory   = "256M"
    timeout_seconds    = 60
  }
}

resource "google_cloud_run_service_iam_member" "default" {
  location = google_cloudfunctions2_function.default.location
  service  = google_cloudfunctions2_function.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "function_uri" {
  value = google_cloudfunctions2_function.default.service_config[0].uri
}
