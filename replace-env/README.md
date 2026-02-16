Usage documentation for this action is found [here](../docs/replace-env/1_Overview.md).

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

Note 1: The compiled JavaScript files in the `lib` folder must be committed to the repository for the action to work.

Note 2: This action is a fork of the [nightstory](https://github.com/nightstory/replace-env/tree/master) replace-env action.