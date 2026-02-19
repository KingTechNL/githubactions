---
sidebar_position: 2
---

# Example

## Basic Usage
Here's a simple example that builds and tests a .NET solution:

```yaml
name: .NET Build and Test

on:
  push:
    branches: [ main, development ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    # Checkout repository
    - uses: actions/checkout@v3

    # Build and test all .NET projects
    - name: Build and Test
      uses: KingTech/KingTech.GithubActions/dotnet-build-test@main
```

## Custom .NET Version
Example specifying a specific .NET version:

```yaml
name: .NET 8 Build

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3

    # Build with .NET 8 only
    - name: Build and Test
      uses: KingTech/KingTech.GithubActions/dotnet-build-test@main
      with:
        dotnet_version: '8.0.x'
```

## With Version Number
Example using a version number (typically from GitVersion):

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

    # Get version number
    - name: Get version
      id: gitversion
      uses: KingTech/KingTech.GithubActions/gitversion@main

    # Build with version
    - name: Build and Test
      uses: KingTech/KingTech.GithubActions/dotnet-build-test@main
      with:
        build_version: ${{ steps.gitversion.outputs.version }}
```

## Custom Test Output Location
Example with a custom test results file:

```yaml
name: .NET Build

on:
  push:
    branches: [ main ]

env:
  TEST_OUTPUT: "custom-test-results.trx"

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3

    - name: Build and Test
      uses: KingTech/KingTech.GithubActions/dotnet-build-test@main
      with:
        test_output: ${{ env.TEST_OUTPUT }}
```

## Multi-Target .NET Versions
Example supporting multiple .NET versions for projects with multi-targeting:

```yaml
name: Multi-Target Build

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3

    - name: Build and Test
      uses: KingTech/KingTech.GithubActions/dotnet-build-test@main
      with:
        dotnet_version: |
          9.0.x
          8.0.x
          6.0.x
```

## What Happens
When this action runs, it will:
1. Install the specified .NET SDK version(s)
2. Restore all NuGet dependencies
3. Build all projects in Release configuration
4. Execute all test projects
5. Generate a test report that appears in the GitHub Actions UI under "DotNET Tests"

The test report makes it easy to see which tests passed or failed without having to dig through logs.