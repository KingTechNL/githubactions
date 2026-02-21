---
sidebar_position: 2
---

# Example

## Complete CI/CD Pipeline
The simplest way to use the base-action with full Docker and NuGet publishing:

```yaml
name: Complete CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
    # Checkout with full history (required for GitVersion)
    - uses: actions/checkout@v3
      with: 
        fetch-depth: 0

    # Run complete pipeline
    - name: Build, Test, Version, and Deploy
      uses: KingTech/KingTech.GithubActions/base-action@main
      with:
        docker_registry_username: ${{ secrets.DOCKERHUB_USERNAME }}
        docker_registry_password: ${{ secrets.DOCKERHUB_TOKEN }}
        docker_image_name: "my-app"
        nuget_api_key: ${{ secrets.NUGET_API_KEY }}
```

This single action will:
1. Generate a semantic version number using GitVersion
2. Build all .NET projects with the version number
3. Run all unit tests and generate a test report
4. Publish NuGet packages (projects ending with `.NuGet.csproj`)
5. Build and push a Docker image with multiple tags (`latest`, version number, branch tag)

## Build and Test Only (No Publishing)
If you only want to build and test without publishing:

```yaml
name: Build and Test

on:
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
      with: 
        fetch-depth: 0

    # Only build and test (no NuGet/Docker publishing)
    - name: Build and Test
      uses: KingTech/KingTech.GithubActions/base-action@main
```

Without credentials, the action skips NuGet and Docker publishing steps.

## NuGet Publishing Only
Publish NuGet packages without Docker images:

```yaml
name: Publish NuGet Packages

on:
  push:
    branches: [ main ]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
      with: 
        fetch-depth: 0

    - name: Build and Publish NuGet
      uses: KingTech/KingTech.GithubActions/base-action@main
      with:
        nuget_api_key: ${{ secrets.NUGET_API_KEY }}
```

## Docker Publishing Only
Build and push Docker images without NuGet packages:

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
      with: 
        fetch-depth: 0

    - name: Build and Publish Docker
      uses: KingTech/KingTech.GithubActions/base-action@main
      with:
        docker_registry_username: ${{ secrets.DOCKERHUB_USERNAME }}
        docker_registry_password: ${{ secrets.DOCKERHUB_TOKEN }}
        docker_image_name: "my-app"
```

## Custom Dockerfile Location
Use a custom Dockerfile path:

```yaml
name: Build with Custom Dockerfile

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
      with: 
        fetch-depth: 0

    - name: Build and Deploy
      uses: KingTech/KingTech.GithubActions/base-action@main
      with:
        docker_registry_username: ${{ secrets.DOCKERHUB_USERNAME }}
        docker_registry_password: ${{ secrets.DOCKERHUB_TOKEN }}
        docker_image_name: "my-app"
        docker_file: "docker/production.Dockerfile"
```

## Private NuGet Feed
Publish to a private NuGet server:

```yaml
name: Publish to Private NuGet

on:
  push:
    branches: [ main ]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
      with: 
        fetch-depth: 0

    - name: Build and Publish
      uses: KingTech/KingTech.GithubActions/base-action@main
      with:
        nuget_api_source: "https://nuget.mycompany.com/v3/index.json"
        nuget_api_key: ${{ secrets.PRIVATE_NUGET_KEY }}
```

## Multi-Branch Strategy
Different behavior for different branches:

```yaml
name: Multi-Branch Pipeline

on:
  push:
    branches: [ main, development, release/* ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
      with: 
        fetch-depth: 0

    # Deploy to production only on main
    - name: Build and Deploy
      if: github.ref == 'refs/heads/main'
      uses: KingTech/KingTech.GithubActions/base-action@main
      with:
        docker_registry_username: ${{ secrets.DOCKERHUB_USERNAME }}
        docker_registry_password: ${{ secrets.DOCKERHUB_TOKEN }}
        docker_image_name: "my-app"
        nuget_api_key: ${{ secrets.NUGET_API_KEY }}

    # Only build and test for other branches
    - name: Build and Test Only
      if: github.ref != 'refs/heads/main'
      uses: KingTech/KingTech.GithubActions/base-action@main
```

## With Additional Steps
Combine with other actions before or after:

```yaml
name: Extended Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
      with: 
        fetch-depth: 0

    # Pre-processing step
    - name: Setup custom environment
      run: |
        echo "Setting up environment..."
        # Your custom setup here

    # Run the base action
    - name: Build, Test, and Deploy
      uses: KingTech/KingTech.GithubActions/base-action@main
      with:
        docker_registry_username: ${{ secrets.DOCKERHUB_USERNAME }}
        docker_registry_password: ${{ secrets.DOCKERHUB_TOKEN }}
        docker_image_name: "my-app"
        nuget_api_key: ${{ secrets.NUGET_API_KEY }}

    # Post-processing step
    - name: Notify deployment
      if: success()
      run: |
        echo "Deployment successful!"
        # Send notification, update status, etc.
```

## Setting Up Secrets
To use this action with publishing enabled, configure these GitHub secrets:

### For Docker Publishing:
1. Go to [Docker Hub](https://hub.docker.com/) and create an access token
2. In GitHub: Settings → Secrets and variables → Actions
3. Add secrets:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token

### For NuGet Publishing:
1. Get your NuGet API key from [nuget.org](https://www.nuget.org/) (or your private feed)
2. In GitHub: Settings → Secrets and variables → Actions
3. Add secret:
   - `NUGET_API_KEY`: Your NuGet API key

## Important Notes
- **Always use `fetch-depth: 0`** when checking out to ensure GitVersion can calculate versions correctly
- **NuGet projects** must end with `.NuGet.csproj` for automatic discovery
- **Docker tags** are automatically generated: `latest`, version number (e.g., `1.2.3`), and branch tag (e.g., `alpha`, `beta`, `main`)
- **Optional publishing**: Omit credentials to skip NuGet or Docker publishing steps
- **Test reports** are automatically generated and visible in the GitHub Actions UI

## What Happens Step-by-Step
When this action runs:

1. **Version Generation**: Uses GitVersion to calculate semantic version based on Git history
2. **Build & Test**: Builds all .NET projects and runs unit tests with the generated version
3. **Test Report**: Creates a test report visible in the Actions UI
4. **NuGet Publishing** (if API key provided):
   - Discovers projects ending with `.NuGet.csproj`
   - Packages them with the version number
   - Pushes to the specified NuGet feed
5. **Docker Publishing** (if credentials provided):
   - Builds Docker image for AMD64 and ARM64
   - Tags with version, branch tag, and `latest`
   - Pushes to Docker registry

Each publishing step is conditional and only executes if the required credentials are provided.