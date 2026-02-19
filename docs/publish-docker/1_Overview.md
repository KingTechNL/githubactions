---
sidebar_position: 1
---

## Publish docker action
The `publish-docker` action builds Docker container images and pushes them to a Docker registry (such as Docker Hub). It uses Docker Buildx to create multi-platform images that run on both AMD64 and ARM64 architectures, making your containers compatible with a wide range of hosting environments.

This action automates the entire Docker workflow: logging into the registry, setting up the build environment, tagging the image with multiple tags, and pushing the built image. It's particularly useful for creating container images as part of your CI/CD pipeline for deployment to Kubernetes, Docker Swarm, or cloud container services.

### Inputs
| Input | Required | Default | Description |
| ----- | -------- | ------- | ----------- |
| `registry_username` | Yes | - | Username for authenticating with the Docker registry. |
| `registry_password` | Yes | - | Password or access token for authenticating with the Docker registry. Store this as a GitHub secret. |
| `image_name` | Yes | - | The name of the Docker image to create (e.g., `my-app`). Combined with username to form the full image name. |
| `tags` | No | `latest` | Tags to apply to the image. Multiple tags can be separated by semicolons (e.g., `latest;1.0.0;beta`). |
| `docker_file` | No | `Dockerfile` | The name or path of the Dockerfile to use for building the image. |
