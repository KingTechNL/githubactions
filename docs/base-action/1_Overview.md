---
sidebar_position: 1
---

## Base action
The `base-action` is a comprehensive, all-in-one workflow that orchestrates a complete CI/CD pipeline for .NET projects. It combines multiple KingTech actions into a single, streamlined process that handles building, testing, versioning, NuGet package publishing, and Docker image deployment.

This action is designed to provide a turnkey solution for .NET projects, eliminating the need to configure individual steps. It automatically generates semantic version numbers, builds and tests your code, publishes NuGet packages (if configured), and deploys Docker images (if credentials are provided). This makes it ideal for projects that follow standard .NET conventions and want a consistent, repeatable deployment process with minimal configuration.

The action intelligently handles optional steps: NuGet publishing only occurs if an API key is provided, and Docker image publishing only happens if registry credentials are supplied.

### Actions Used
This action combines the following KingTech actions:
- **[gitversion](../gitversion/1_Overview.md)** - Generates semantic version numbers
- **[dotnet-build-test](../dotnet-build-test/1_Overview.md)** - Builds and tests all .NET projects
- **[publish-nuget](../publish-nuget/1_Overview.md)** - Packages and publishes NuGet packages (optional)
- **[publish-docker](../publish-docker/1_Overview.md)** - Builds and pushes Docker images (optional)

### Inputs
| Input | Required | Default | Description |
| ----- | -------- | ------- | ----------- |
| `docker_image_name` | No | '' | The name of the Docker image to create and push. Required if publishing Docker images. |
| `docker_registry_username` | No | - | Username for authenticating with the Docker registry. If provided, triggers Docker image publishing. |
| `docker_registry_password` | No | - | Password or access token for the Docker registry. Store this as a GitHub secret. |
| `docker_file` | No | `Dockerfile` | The name or path of the Dockerfile to use for building the image. |
| `nuget_api_source` | No | `https://www.nuget.org` | The NuGet server URL where packages will be pushed. |
| `nuget_api_key` | No | '' | API key for authenticating with the NuGet server. If provided, triggers NuGet package publishing. Store this as a GitHub secret. |
