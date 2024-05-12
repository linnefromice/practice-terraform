# prototype-backend

## How to

```bash
# Push Artifact Registry
gcloud auth configure-docker us-east1-docker.pkg.dev
cd docker
docker-compose -f docker-compose.with-app.yml build
docker tag docker-app:latest us-east1-docker.pkg.dev/sandbox-linne-1/backend-nodejs-graphql/app:0.1
docker push us-east1-docker.pkg.dev/sandbox-linne-1/backend-nodejs-graphql/app:0.1


# ex: us-east1-docker.pkg.dev/sandbox-linne-1/backend-nodejs-graphql
# ref
#   https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling
```
