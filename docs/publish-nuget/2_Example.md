---
sidebar_position: 2
---

# Example

## Auto-Discovery with .NuGet.csproj Convention
The simplest way to use this action is with automatic project discovery. Name your NuGet projects with a `.NuGet.csproj` suffix:

```yaml
name: Publish NuGet Packages

on:
  push:
    branches: [ main ]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
    # Checkout repository
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0

    # Get version number
    - name: Get version
      id: gitversion
      uses: KingTech/KingTech.GithubActions/gitversion@main

    # Build and publish all .NuGet.csproj projects
    - name: Publish NuGet packages
      uses: KingTech/KingTech.GithubActions/publish-nuget@main
      with:
        nuget_version: ${{ steps.gitversion.outputs.version }}
        nuget_api_key: ${{ secrets.NUGET_API_KEY }}
```

This will automatically find and publish projects like `MyLibrary.NuGet.csproj`, `Utilities.NuGet.csproj`, etc.

## Specifying Explicit Projects
Example explicitly specifying which projects to publish:

```yaml
name: Publish Specific NuGet Packages

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

    - name: Get version
      id: gitversion
      uses: KingTech/KingTech.GithubActions/gitversion@main

    # Publish specific projects
    - name: Publish NuGet packages
      uses: KingTech/KingTech.GithubActions/publish-nuget@main
      with:
        nuget_projects: "src/MyLibrary/MyLibrary.csproj;src/Core/Core.csproj"
        nuget_version: ${{ steps.gitversion.outputs.version }}
        nuget_api_key: ${{ secrets.NUGET_API_KEY }}
```

## Publishing to Private NuGet Feed
Example publishing to a private NuGet server or Azure Artifacts:

```yaml
name: Publish to Private Feed

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

    - name: Get version
      id: gitversion
      uses: KingTech/KingTech.GithubActions/gitversion@main

    # Publish to private NuGet feed
    - name: Publish NuGet packages
      uses: KingTech/KingTech.GithubActions/publish-nuget@main
      with:
        nuget_version: ${{ steps.gitversion.outputs.version }}
        nuget_api_source: "https://pkgs.dev.azure.com/myorg/_packaging/myfeed/nuget/v3/index.json"
        nuget_api_key: ${{ secrets.AZURE_ARTIFACTS_KEY }}
```

## Publishing to GitHub Packages
Example publishing to GitHub Packages NuGet feed:

```yaml
name: Publish to GitHub Packages

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

    - name: Get version
      id: gitversion
      uses: KingTech/KingTech.GithubActions/gitversion@main

    # Publish to GitHub Packages
    - name: Publish NuGet packages
      uses: KingTech/KingTech.GithubActions/publish-nuget@main
      with:
        nuget_version: ${{ steps.gitversion.outputs.version }}
        nuget_api_source: "https://nuget.pkg.github.com/OWNER/index.json"
        nuget_api_key: ${{ secrets.GITHUB_TOKEN }}
```

Replace `OWNER` with your GitHub username or organization name.

## Complete Build, Test, and Publish Pipeline
Example of a full workflow including build, test, versioning, and publishing:

```yaml
name: Complete NuGet Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    steps:
    # Checkout code
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0

    # Build and test
    - name: Build and Test
      uses: KingTech/KingTech.GithubActions/dotnet-build-test@main

    # Get version number
    - name: Get version
      id: gitversion
      uses: KingTech/KingTech.GithubActions/gitversion@main

    # Publish NuGet packages
    - name: Publish NuGet packages
      uses: KingTech/KingTech.GithubActions/publish-nuget@main
      with:
        nuget_version: ${{ steps.gitversion.outputs.version }}
        nuget_api_key: ${{ secrets.NUGET_API_KEY }}
```

## With Static Version Number
Example using a static version number (not recommended for production):

```yaml
name: Publish with Static Version

on:
  push:
    branches: [ main ]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Publish NuGet packages
      uses: KingTech/KingTech.GithubActions/publish-nuget@main
      with:
        nuget_version: "1.0.0"
        nuget_api_key: ${{ secrets.NUGET_API_KEY }}
```

## Setting Up NuGet API Key
To use this action, you need to add your NuGet API key as a GitHub secret:

1. **For NuGet.org:**
   - Go to [nuget.org](https://www.nuget.org/) and sign in
   - Navigate to your account settings and create an API key
   - Copy the generated API key

2. **Add to GitHub:**
   - Go to your GitHub repository Settings → Secrets and variables → Actions
   - Add a new secret named `NUGET_API_KEY` with your API key as the value

3. **For private feeds:**
   - Follow the same process but use your private feed's authentication token
   - Name the secret appropriately (e.g., `AZURE_ARTIFACTS_KEY`)

## Project Naming Convention
For automatic discovery to work, follow this naming pattern:
- **Publishable projects:** `MyLibrary.NuGet.csproj`
- **Regular projects:** `MyLibrary.csproj`

This allows the action to distinguish between projects meant for NuGet publishing and regular projects.

## What Happens
When this action runs, it will:
1. Discover NuGet projects (either automatically or from the specified list)
2. Setup .NET SDK (supports .NET 3.1, 5.0, 6.0+)
3. Build all projects with the specified version number
4. Create NuGet packages (.nupkg files) for each project
5. Push the packages to the specified NuGet feed
6. Skip packages that already exist (using `--skip-duplicate`)

The published packages will be available on your NuGet feed and can be installed using `dotnet add package <PackageName>`.