# Terraform: Create GCP Project

```bash
gcloud auth application-default login
cd service # or project
terraform plan
terraform apply -auto-approve

# or GOOGLE_APPLICATION_CREDENTIALS=../credentials.json terraform apply -auto-approve
```
