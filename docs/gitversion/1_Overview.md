---
sidebar_position: 1
---

## gitversion action
The `gitversion` action automatically calculates semantic version numbers for your builds based on your Git repository history using [GitVersion](https://gitversion.net/). It analyzes your commit history, branches, and tags to determine the appropriate version number following semantic versioning principles (Major.Minor.Patch).

This action eliminates manual version management by deriving versions from your Git branching strategy. It provides consistent, reproducible version numbers across builds and generates various version formats suitable for different purposes (NuGet packages, assemblies, Docker tags, etc.).

The action also extracts branch information and assigns branch-specific tags (e.g., 'alpha' for development branches, 'beta' for release branches, 'main' for production) that can be used for tagging artifacts.

### Inputs
| Input | Required | Default | Description |
| ----- | -------- | ------- | ----------- |
| `targetPath` | No | '' | The path to the working directory containing the Git repository. Defaults to the repository root. |
| `useConfigFile` | No | `true` | Whether to use a GitVersion configuration file to customize versioning behavior. |
| `configFilePath` | No | '' | Path to a custom GitVersion configuration file. If not specified and `useConfigFile` is true, downloads the default config from the KingTech repository. |
| `updateAssemblyInfo` | No | `false` | Whether to automatically update version numbers in .NET AssemblyInfo files. |
| `updateAssemblyInfoFilename` | No | '' | Specific AssemblyInfo filename to update with version information. |
| `additionalArguments` | No | '' | Additional command-line arguments to pass to the GitVersion tool. |

### Outputs
| Output | Description | Example |
| ------ | ----------- | ------- |
| `version` | The full semantic version number (SemVer). | `1.2.3` |
| `branch` | The name of the current Git branch. | `development` |
| `branchTag` | A tag derived from the branch name: 'main' for main branch, 'beta' for release branches, 'alpha' for development, 'dev' for others. | `alpha` |

Additionally, the action outputs numerous GitVersion properties including `major`, `minor`, `patch`, `preReleaseTag`, `nuGetVersion`, `assemblySemVer`, `shortSha`, and many more that can be accessed via `${{ steps.<step-id>.outputs.<property> }}`.
