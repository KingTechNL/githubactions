# Replace-env action
The 'replace-env' action is used to replace environment variable placeholders in files with their actual values from the environment.

For example, if your file contains ${FOO_BAR_123} and you have an environment variable FOO_BAR_123='literally whatever', the action will replace the placeholder with the actual value, resulting in literally whatever in the file.

Key features:
- Works on single files or entire directories (recursively)
- Supports multiple placeholder formats: ${VAR}, ${{VAR}}, or __VAR__  (⚠️ no spaces around the key.)
- Can process multiple files/directories at once (multiline input)
- Optionally fails if a referenced environment variable doesn't exist

## Usage

```
  - name: replace-env
    uses: kingtechnl/githubactions/replace-env@main
    with:
      input_file: |
        ./docusaurus/my-website/sidebars.js
        ./docusaurus/my-website/docusaurus.config.js
        ./docusaurus/my-website/docs
        ./docusaurus/my-website/blog
      pattern: single_dollar_brackets
      fail_on_missing_env: true
```

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

## Development
To compile the TypeScript source files after making changes:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```
   Or on Windows:
   ```powershell
   .\node_modules\.bin\ncc build --license licenses.txt --source-map -m -q src/main.ts -o lib
   ```

3. Commit and push the changes:
   ```bash
   git add -A
   git commit -m "Your commit message"
   git push
   ```

Note: The compiled JavaScript files in the `lib` folder must be committed to the repository for the action to work.

Note: This action is a fork of the [nightstory](https://github.com/nightstory/replace-env/tree/master) replace-env action.