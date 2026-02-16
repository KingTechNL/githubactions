---
sidebar_position: 1
---

## replace-env action
The `replace-env` action is used to replace environment variable placeholders in files with their actual values from the environment.

For example, if your file contains ${FOO_BAR_123} and you have an environment variable FOO_BAR_123='literally whatever', the action will replace the placeholder with the actual value, resulting in literally whatever in the file.

Key features:
- Works on single files or entire directories (recursively)
- Supports multiple placeholder formats: `${VAR}`, `${{VAR}}`, or `__VAR__` (⚠️ no spaces around the key.)
- Can process multiple files/directories at once (multiline input)
- Optionally fails if a referenced environment variable doesn't exist

### Inputs
- `input_file`
    - Path to file with the placeholders to replace. If directory, will replace all files in the directory.
- `output_file`
    - Path to output file. If `input_file` is directory, will be a directory too.
    - Optional, defaults to `input_file`
- `pattern`
    - Which placeholders to replace.
    - Options:
      - `single_dollar_brackets` -> `${VARIABLE}`
      - `double_dollar_brackets` -> `${{VARIABLE}}`
      - `double_underscore` -> `__VARIABLE__`
    - Optional, defaults to `single_dollar_brackets`
- `fail_on_missing_env`
    - If true, will fail if a key required in the input file is missing in the environment.
    - default: `false`
