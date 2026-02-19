---
sidebar_position: 2
---

# Example

## Basic Usage
Here's a simple example that generates a version number and displays it:

```yaml
name: Version Generation

on:
  push:
    branches: [ main, development ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    # Checkout with full history (required for GitVersion)
    - uses: actions/checkout@v3
      with: 
        fetch-depth: 0

    # Generate version number
    - name: Get version
      id: get_version
      uses: KingTech/KingTech.GithubActions/gitversion@main

    # Display the generated version
    - name: Print version
      run: |
        echo "Generated version: ${{ steps.get_version.outputs.version }}"
        echo "Branch: ${{ steps.get_version.outputs.branch }}"
        echo "Branch tag: ${{ steps.get_version.outputs.branchTag }}"
```

## Using Version for Build
This example shows how to use the generated version number in a .NET build:

```yaml
name: Build with Version

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

    # Generate version
    - name: Get version
      id: gitversion
      uses: KingTech/KingTech.GithubActions/gitversion@main

    # Build with version
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '8.0.x'

    - name: Build
      run: dotnet build --configuration Release -p:Version=${{ steps.gitversion.outputs.version }}

    - name: Create NuGet package
      run: dotnet pack --configuration Release -p:PackageVersion=${{ steps.gitversion.outputs.version }} --no-build
```

## Using Custom Configuration
Example with a custom GitVersion configuration file:

```yaml
name: Version with Custom Config

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

    # Use custom GitVersion config
    - name: Get version
      id: get_version
      uses: KingTech/KingTech.GithubActions/gitversion@main
      with:
        useConfigFile: true
        configFilePath: './config/GitVersion.yml'

    - name: Display version
      run: echo "Version ${{ steps.get_version.outputs.version }}"
```

## Important Notes
- Always use `fetch-depth: 0` when checking out your repository. GitVersion needs the full Git history to calculate versions correctly.
- The version is also available as an environment variable `$VERSION` for use in subsequent steps.
- You can access all GitVersion outputs using `${{ steps.<step-id>.outputs.<property> }}` (e.g., `major`, `minor`, `patch`, `nuGetVersion`, etc.).
