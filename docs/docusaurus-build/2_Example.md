---
sidebar_position: 2
---

# Example

## Basic Usage
Here's a simple example that builds a Docusaurus site from your documentation:

```yaml
name: Build Documentation

on:
  push:
    branches: [ main ]

jobs:
  build-docs:
    runs-on: ubuntu-latest
    steps:
    # Checkout repository
    - uses: actions/checkout@v3

    # Build Docusaurus site
    - name: Build documentation site
      uses: KingTech/KingTech.GithubActions/docusaurus-build@main
      with:
        siteName: 'my-docs'
        targetDir: './build'
```

This will look for `docs/`, `blog/`, `src/`, and `static/` folders in your repository and build them into a Docusaurus site.

## With Custom Directories
Example specifying custom source directories:

```yaml
name: Build Documentation

on:
  push:
    branches: [ main ]

jobs:
  build-docs:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Build documentation site
      uses: KingTech/KingTech.GithubActions/docusaurus-build@main
      with:
        docsDir: 'documentation'
        blogDir: 'articles'
        staticDir: 'assets'
        siteName: 'my-project-docs'
        targetDir: './publish'
```

## With Custom Configuration
Example using custom configuration and sidebar files:

```yaml
name: Build Documentation

on:
  push:
    branches: [ main ]

jobs:
  build-docs:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Build documentation site
      uses: KingTech/KingTech.GithubActions/docusaurus-build@main
      with:
        siteName: 'my-docs'
        configFile: './config/docusaurus.config.js'
        sideBarsFile: './config/sidebars.js'
        targetDir: './build'
```

## With Branding and Metadata
Example with full customization including branding and site metadata:

```yaml
name: Build Documentation

on:
  push:
    branches: [ main ]

jobs:
  build-docs:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Build documentation site
      uses: KingTech/KingTech.GithubActions/docusaurus-build@main
      with:
        siteName: 'my-product-docs'
        projectName: 'My Product'
        url: 'https://docs.mycompany.com'
        baseUrl: '/my-product/'
        brand: 'My Company'
        logo: './static/img/logo.svg'
        favicon: './static/img/favicon.ico'
        customCss: './static/css/custom.css'
        targetDir: './build'
```

## With Environment Variable Replacement
Example using environment variables in configuration files:

```yaml
name: Build Documentation

on:
  push:
    branches: [ main ]

env:
  SITE_URL: 'https://docs.mycompany.com'
  PROJECT_NAME: 'My Awesome Project'

jobs:
  build-docs:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Build documentation site
      uses: KingTech/KingTech.GithubActions/docusaurus-build@main
      with:
        siteName: 'my-docs'
        replaceEnv: 'true'
        url: ${{ env.SITE_URL }}
        projectName: ${{ env.PROJECT_NAME }}
        targetDir: './build'
```

## Build and Deploy to GitHub Pages
Complete example building docs and deploying to GitHub Pages:

```yaml
name: Build and Deploy Documentation

on:
  push:
    branches: [ main ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    # Build the documentation
    - name: Build documentation site
      uses: KingTech/KingTech.GithubActions/docusaurus-build@main
      with:
        siteName: 'my-docs'
        url: 'https://mycompany.github.io'
        baseUrl: '/my-project/'
        targetDir: './build'

    # Deploy to GitHub Pages
    - name: Deploy to GitHub Pages
      uses: KingTech/KingTech.GithubActions/deploy-pages@main
      with:
        sourceDir: './build'
```

## TypeScript Variant
Example using the TypeScript template:

```yaml
name: Build Documentation

on:
  push:
    branches: [ main ]

jobs:
  build-docs:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Build documentation site
      uses: KingTech/KingTech.GithubActions/docusaurus-build@main
      with:
        siteName: 'my-docs'
        docusaurusVariant: 'typescript'
        docusaurusVersion: '3.9.2'
        targetDir: './build'
```

## With Translation Support (i18n)
Example using a custom translation folder and default locale:

```yaml
name: Build Documentation

on:
  push:
    branches: [ main ]

jobs:
  build-docs:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Build multilingual documentation site
      uses: KingTech/KingTech.GithubActions/docusaurus-build@main
      with:
        siteName: 'my-docs'
        DefaultLanguage: 'nl'
        TranslationsDir: './i18n'
        targetDir: './build'
```

This copies your translation files into Docusaurus `i18n` and sets the default locale for the generated site.

## What Happens
When this action runs, it will:
1. Install Node.js and required dependencies
2. Create a new Docusaurus site with the specified template
3. Copy your documentation files (docs, blog, static assets) into the site
4. Apply custom configuration, branding, and styling
5. Build the static website (HTML, CSS, JavaScript)
6. Output the generated website to the target directory

The resulting static site can be deployed to any hosting service like GitHub Pages, Netlify, or AWS S3.