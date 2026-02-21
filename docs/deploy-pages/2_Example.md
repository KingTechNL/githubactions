---
sidebar_position: 2
---

# Example

## Basic Deployment
Simple deployment of a static site to GitHub Pages:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    # Build your static site (example)
    - name: Build site
      run: |
        mkdir -p build
        echo "<html><body><h1>Hello GitHub Pages</h1></body></html>" > build/index.html

    # Deploy to GitHub Pages
    - name: Deploy
      uses: KingTech/KingTech.GithubActions/deploy-pages@main
      with:
        sourceDir: 'build'
```

## Deploy Docusaurus Site
Complete example building and deploying a Docusaurus documentation site:

```yaml
name: Deploy Documentation

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    # Build Docusaurus site
    - name: Build documentation
      uses: KingTech/KingTech.GithubActions/docusaurus-build@main
      with:
        siteName: 'my-docs'
        targetDir: './build'

    # Deploy to GitHub Pages
    - name: Deploy to GitHub Pages
      uses: KingTech/KingTech.GithubActions/deploy-pages@main
      with:
        sourceDir: './build'
```

## With Custom Domain
Deploy to GitHub Pages with a custom domain:

```yaml
name: Deploy with Custom Domain

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    # Build your site
    - name: Build site
      run: npm run build

    # Deploy with custom domain
    - name: Deploy to GitHub Pages
      uses: KingTech/KingTech.GithubActions/deploy-pages@main
      with:
        sourceDir: './dist'
        url: 'docs.mycompany.com'
```

This automatically creates a CNAME file with your custom domain.

## With Custom Commit Message
Use a descriptive commit message for deployments:

```yaml
name: Deploy with Custom Message

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0

    # Get version for commit message
    - name: Get version
      id: version
      uses: KingTech/KingTech.GithubActions/gitversion@main

    # Build site
    - name: Build
      run: npm run build

    # Deploy with version in commit message
    - name: Deploy
      uses: KingTech/KingTech.GithubActions/deploy-pages@main
      with:
        sourceDir: './dist'
        commitMessage: 'Deploy version ${{ steps.version.outputs.version }}'
```

## Deploy to Custom Branch
Deploy to a different branch (not `gh-pages`):

```yaml
name: Deploy to Custom Branch

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Build site
      run: npm run build

    # Deploy to 'production' branch
    - name: Deploy
      uses: KingTech/KingTech.GithubActions/deploy-pages@main
      with:
        sourceDir: './dist'
        targetBranch: 'production'
```

Remember to configure GitHub Pages to serve from this branch in repository settings.

## Multi-Environment Deployment
Deploy to different environments based on branch:

```yaml
name: Multi-Environment Deploy

on:
  push:
    branches: [ main, staging ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Build site
      run: npm run build

    # Deploy to production (main branch)
    - name: Deploy to Production
      if: github.ref == 'refs/heads/main'
      uses: KingTech/KingTech.GithubActions/deploy-pages@main
      with:
        sourceDir: './dist'
        targetBranch: 'gh-pages'
        commitMessage: 'Deploy to production'

    # Deploy to staging (staging branch)
    - name: Deploy to Staging
      if: github.ref == 'refs/heads/staging'
      uses: KingTech/KingTech.GithubActions/deploy-pages@main
      with:
        sourceDir: './dist'
        targetBranch: 'gh-pages-staging'
        commitMessage: 'Deploy to staging'
```

## Complete Documentation Pipeline
Full workflow: build docs with Docusaurus, version, and deploy with custom domain:

```yaml
name: Documentation Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0

    # Get version number
    - name: Get version
      id: version
      uses: KingTech/KingTech.GithubActions/gitversion@main

    # Build Docusaurus with version
    - name: Build documentation
      uses: KingTech/KingTech.GithubActions/docusaurus-build@main
      with:
        siteName: 'my-docs'
        projectName: 'My Project'
        url: 'https://docs.mycompany.com'
        targetDir: './build'

    # Deploy to GitHub Pages with custom domain
    - name: Deploy to GitHub Pages
      uses: KingTech/KingTech.GithubActions/deploy-pages@main
      with:
        sourceDir: './build'
        url: 'docs.mycompany.com'
        commitMessage: 'Deploy documentation v${{ steps.version.outputs.version }}'
```

## Deploy Static HTML Site
Deploy a simple HTML site without a build step:

```yaml
name: Deploy Static Site

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    # Deploy the 'public' folder directly
    - name: Deploy
      uses: KingTech/KingTech.GithubActions/deploy-pages@main
      with:
        sourceDir: './public'
```

## Deploy with Personal Access Token
Use a custom token instead of the default GITHUB_TOKEN:

```yaml
name: Deploy with PAT

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Build site
      run: npm run build

    # Deploy with personal access token
    - name: Deploy
      uses: KingTech/KingTech.GithubActions/deploy-pages@main
      with:
        sourceDir: './dist'
        token: ${{ secrets.PAGES_DEPLOY_TOKEN }}
```

Useful when you need additional permissions or want to trigger workflows on the target branch.

## Configuring GitHub Pages

After your first deployment, configure GitHub Pages in your repository:

1. **Go to Settings → Pages**
2. **Source:** Select "Deploy from a branch"
3. **Branch:** Choose the target branch (default: `gh-pages`) and folder (`/ (root)`)
4. **Custom domain** (optional): If using the `url` parameter, verify it appears here
5. **Enforce HTTPS:** Enable this for secure connections

Your site will be available at:
- Default: `https://<username>.github.io/<repository>`
- Custom domain: `https://<your-custom-domain>`

## Important Notes

- **Initial Setup:** The first deployment creates the target branch if it doesn't exist
- **Force Push:** Deployments use force push, so the target branch only contains the latest deployment
- **CNAME File:** When using custom domains, a CNAME file is automatically created
- **Token Permissions:** The default `GITHUB_TOKEN` has sufficient permissions for most cases
- **No Checkout Needed:** The action doesn't require checking out the target branch, only the source
- **Clean Deployments:** Each deployment replaces the entire target branch content

## What Happens

When this action runs, it will:
1. Copy all files from the source directory to a temporary location
2. Create a CNAME file if a custom URL is specified
3. Initialize a new Git repository in the temporary location
4. Commit all files with the specified commit message
5. Force push to the target branch, replacing its entire contents
6. GitHub Pages automatically rebuilds and serves the updated site

The deployment typically takes 1-2 minutes to appear on the live site after pushing.
