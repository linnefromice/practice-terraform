resource "google_storage_bucket" "default" {
  name                        = "gcp-tutorial-gcf-source"
  location                    = "US"
  uniform_bucket_level_access = true
}

data "archive_file" "default" {
  type = "zip"
  # source_file = "functions/function-source.zip"
  source_dir  = "functions/function-source"
  output_path = "tmp/source.zip"
}
# data "archive_file" "zip_temp_1" {
#   type        = "zip"
#   source_dir  = "functions"
#   output_path = "tmp/source-temp-1.zip"
# }

resource "google_storage_bucket_object" "object" {
  name   = "source.zip"
  bucket = google_storage_bucket.default.name
  source = data.archive_file.default.output_path
}
# resource "google_storage_bucket_object" "object_temp_1" {
#   name   = "source-temp-1.zip"
#   bucket = google_storage_bucket.default.name
#   source = data.archive_file.zip_temp_1.output_path
# }

resource "google_cloudfunctions2_function" "default" {
  name     = "gcp-tutorial-gcf"
  location = "us-central1"

  build_config {
    runtime     = "nodejs16"
    entry_point = "helloHttp"
    source {
      storage_source {
        bucket = google_storage_bucket.default.name
        object = google_storage_bucket_object.object.name
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
