---
sidebar_position: 1
---

## Publish nuget action
The `publish-nuget` action packages .NET projects into NuGet packages and publishes them to a NuGet feed (such as NuGet.org or a private NuGet server). It can automatically discover projects to package or work with explicitly specified projects, making it flexible for different repository structures.

This action simplifies the NuGet publishing workflow by handling project discovery, building, packaging with version numbers, and pushing to the NuGet server. It's particularly useful for maintaining shared libraries and distributing reusable .NET components across multiple projects.

The action uses a smart discovery mechanism: if no projects are specified, it automatically finds all projects ending with `.NuGet.csproj` in your repository, making it easy to follow a naming convention for publishable packages.

### Inputs
| Input | Required | Default | Description |
| ----- | -------- | ------- | ----------- |
| `nuget_projects` | No | '' | Names or paths of specific projects to publish as NuGet packages, separated by semicolons. If empty, automatically discovers projects ending with `.NuGet.csproj`. |
| `nuget_version` | Yes | - | The version number to assign to the NuGet package (e.g., `1.2.3`). Typically obtained from GitVersion. |
| `nuget_api_source` | No | `https://www.nuget.org` | The NuGet server URL where packages will be pushed. Use a custom URL for private feeds. |
| `nuget_api_key` | Yes | - | API key for authenticating with the NuGet server. Store this as a GitHub secret. |