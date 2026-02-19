---
sidebar_position: 2
---

# Example

## Basic Usage
Here's a simple example that builds and publishes a Docker image to Docker Hub:

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [ main ]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
    # Checkout repository
    - uses: actions/checkout@v3

    # Build and push Docker image
    - name: Build and push to Docker Hub
      uses: KingTech/KingTech.GithubActions/publish-docker@main
      with:
        registry_username: ${{ secrets.DOCKERHUB_USERNAME }}
        registry_password: ${{ secrets.DOCKERHUB_TOKEN }}
        image_name: "my-app"
```

This will create an image tagged as `latest` by default.

## With Multiple Tags
Example pushing an image with multiple tags:

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [ main ]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Build and push with multiple tags
      uses: KingTech/KingTech.GithubActions/publish-docker@main
      with:
        registry_username: ${{ secrets.DOCKERHUB_USERNAME }}
        registry_password: ${{ secrets.DOCKERHUB_TOKEN }}
        image_name: "my-app"
        tags: "latest;1.0.0;stable"
```

This will tag the image as `latest`, `1.0.0`, and `stable`.

## With Version from GitVersion
Example using a version number from GitVersion:

```yaml
name: Build and Push Versioned Docker Image

on:
  push:
    branches: [ main ]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0

    # Get version number
    - name: Get version
      id: gitversion
      uses: KingTech/KingTech.GithubActions/gitversion@main

    # Build and push with version tag
    - name: Build and push Docker image
      uses: KingTech/KingTech.GithubActions/publish-docker@main
      with:
        registry_username: ${{ secrets.DOCKERHUB_USERNAME }}
        registry_password: ${{ secrets.DOCKERHUB_TOKEN }}
        image_name: "my-app"
        tags: "latest;${{ steps.gitversion.outputs.version }}"
```

## With Custom Dockerfile
Example using a custom Dockerfile location:

```yaml
name: Build Custom Docker Image

on:
  push:
    branches: [ main ]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Build from custom Dockerfile
      uses: KingTech/KingTech.GithubActions/publish-docker@main
      with:
        registry_username: ${{ secrets.DOCKERHUB_USERNAME }}
        registry_password: ${{ secrets.DOCKERHUB_TOKEN }}
        image_name: "my-app"
        docker_file: "docker/api.Dockerfile"
        tags: "latest"
```

## With Branch-Specific Tags
Example creating different tags based on the branch:

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [ main, development, release/* ]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0

    - name: Get version and branch
      id: gitversion
      uses: KingTech/KingTech.GithubActions/gitversion@main

    - name: Build and push with branch tag
      uses: KingTech/KingTech.GithubActions/publish-docker@main
      with:
        registry_username: ${{ secrets.DOCKERHUB_USERNAME }}
        registry_password: ${{ secrets.DOCKERHUB_TOKEN }}
        image_name: "my-app"
        tags: "${{ steps.gitversion.outputs.branchTag }};${{ steps.gitversion.outputs.version }}"
```

This creates tags like `alpha`, `beta`, or `main` along with the version number.

## Complete CI/CD Pipeline
Example of a full pipeline: build, test, version, and deploy:

```yaml
name: Complete Docker Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    # Checkout code
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0

    # Build and test .NET application
    - name: Build and Test
      uses: KingTech/KingTech.GithubActions/dotnet-build-test@main

    # Get version number
    - name: Get version
      id: gitversion
      uses: KingTech/KingTech.GithubActions/gitversion@main

    # Build and push Docker image
    - name: Build and push Docker image
      uses: KingTech/KingTech.GithubActions/publish-docker@main
      with:
        registry_username: ${{ secrets.DOCKERHUB_USERNAME }}
        registry_password: ${{ secrets.DOCKERHUB_TOKEN }}
        image_name: "my-app"
        tags: "latest;${{ steps.gitversion.outputs.version }};${{ steps.gitversion.outputs.branchTag }}"
```

## Setting Up Docker Hub Secrets
To use this action, you need to add Docker Hub credentials as GitHub secrets:

1. Go to your Docker Hub account and create an access token
2. In your GitHub repository, go to Settings → Secrets and variables → Actions
3. Add two secrets:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token

## What Happens
When this action runs, it will:
1. Log in to the Docker registry using provided credentials
2. Set up Docker Buildx for multi-platform builds
3. Build the Docker image for both AMD64 and ARM64 architectures
4. Tag the image with all specified tags
5. Push the image(s) to the Docker registry

The resulting images will be available in your Docker Hub repository and can be pulled using `docker pull <username>/<image_name>:<tag>`.