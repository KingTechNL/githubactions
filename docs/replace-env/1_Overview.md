---
sidebar_position: 1
---

## replace-env action
The `replace-env` action replaces environment variable placeholders in files with their actual values from the GitHub Actions environment. It supports multiple placeholder formats and can process single files, multiple files, or entire directories recursively.

This action is essential for injecting environment-specific configuration values, secrets, and dynamic variables into configuration files, deployment manifests, or application settings without hardcoding them in your repository. It's particularly useful for managing different configurations across environments (development, staging, production) or for inserting version numbers, API endpoints, and credentials during the CI/CD process.

The action modifies files in-place by default but can also output to different files, making it flexible for both template-based and direct configuration scenarios.

### Inputs
| Input | Required | Default | Description |
| ----- | -------- | ------- | ----------- |
| `input_file` | Yes | - | Path to file(s) or directory/directories with placeholders to replace. Multiple paths can be specified using multiline format. If a directory is provided, all files within it are processed recursively. |
| `output_file` | No | (same as input_file) | Path to the output file or directory. If specified, creates new files instead of modifying the originals. When `input_file` is a directory, this must also be a directory. |
| `pattern` | No | `single_dollar_brackets` | The placeholder format to replace. Options: `single_dollar_brackets` (`${VAR}`), `double_dollar_brackets` (`${{VAR}}`), or `double_underscore` (`__VAR__`). No spaces allowed around variable names. |
| `fail_on_missing_env` | No | `false` | Whether to fail the workflow if a placeholder references an environment variable that doesn't exist. Set to `true` to ensure all required variables are defined. |
