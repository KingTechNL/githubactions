---
sidebar_position: 1
---

## Dotnet-build-test action
The `dotnet-build-test` action automates the build and test process for .NET projects. It restores dependencies, builds all projects in Release configuration, executes all unit tests, and generates a comprehensive test report that's visible directly in the GitHub Actions workflow.

This action is designed to work with any .NET solution or project, automatically discovering and running all test projects. The generated test report makes it easy to identify test failures and track test results over time without leaving GitHub.

### Inputs
| Input | Required | Default | Description |
| ----- | -------- | ------- | ----------- |
| `dotnet_version` | No | `10.0.x`<br/>`9.0.x`<br/>`8.0.x`<br/>`6.0.x` | The .NET SDK version(s) to install. Supports multiple versions for multi-targeting projects. |
| `test_output` | No | `test-results.trx` | The output filename for test results in TRX format, used for report generation. |
| `build_version` | No | '' | Optional version number to apply to the build (e.g., `1.2.3`). If specified, sets the assembly version. |

### Outputs
