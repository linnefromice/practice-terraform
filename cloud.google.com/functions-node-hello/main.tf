resource "google_storage_bucket" "default" {
  name                        = "gcp-tutorial-gcf-source"
  location                    = "US"
  uniform_bucket_level_access = true
}

data "archive_file" "default" {
  type        = "zip"
  source_file = "functions/function-source.zip"
  # source_dir  = "functions"
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
