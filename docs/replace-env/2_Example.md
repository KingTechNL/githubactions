---
sidebar_position: 2
---

# Example

## Basic Usage - Single File
Replace environment variables in a single configuration file:

```yaml
name: Deploy with Configuration

on:
  push:
    branches: [ main ]

env:
  API_URL: "https://api.production.com"
  APP_NAME: "MyApp"
  VERSION: "1.2.3"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    # Replace environment variables in config file
    - name: Replace environment variables
      uses: KingTech/KingTech.GithubActions/replace-env@main
      with:
        input_file: './config/appsettings.json'
```

If your `appsettings.json` contains:
```json
{
  "ApiUrl": "${API_URL}",
  "AppName": "${APP_NAME}",
  "Version": "${VERSION}"
}
```

It will be transformed to:
```json
{
  "ApiUrl": "https://api.production.com",
  "AppName": "MyApp",
  "Version": "1.2.3"
}
```

## Multiple Files
Replace environment variables in multiple files at once:

```yaml
name: Configure Multiple Files

on:
  push:
    branches: [ main ]

env:
  DATABASE_URL: "postgresql://localhost:5432/mydb"
  REDIS_URL: "redis://localhost:6379"
  API_KEY: ${{ secrets.API_KEY }}

jobs:
  configure:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    # Replace variables in multiple files
    - name: Replace environment variables
      uses: KingTech/KingTech.GithubActions/replace-env@main
      with:
        input_file: |
          ./config/database.yml
          ./config/redis.conf
          ./config/api.config
```

## Entire Directory (Recursive)
Replace environment variables in all files within a directory:

```yaml
name: Configure Directory

on:
  push:
    branches: [ main ]

env:
  ENVIRONMENT: "production"
  SITE_URL: "https://mysite.com"

jobs:
  configure:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    # Replace in all files in directory recursively
    - name: Replace environment variables
      uses: KingTech/KingTech.GithubActions/replace-env@main
      with:
        input_file: './config'
```

This will process all files in the `config` directory and its subdirectories.

## With Different Placeholder Patterns
Example using different placeholder formats:

### Single Dollar Brackets (Default)
```yaml
- name: Replace with ${VAR}
  uses: KingTech/KingTech.GithubActions/replace-env@main
  with:
    input_file: './config.yml'
    pattern: 'single_dollar_brackets'
```
Replaces: `${API_URL}`, `${DATABASE_NAME}`, etc.

### Double Dollar Brackets
```yaml
- name: Replace with ${{VAR}}
  uses: KingTech/KingTech.GithubActions/replace-env@main
  with:
    input_file: './config.yml'
    pattern: 'double_dollar_brackets'
```
Replaces: `${{API_URL}}`, `${{DATABASE_NAME}}`, etc.

### Double Underscore
```yaml
- name: Replace with __VAR__
  uses: KingTech/KingTech.GithubActions/replace-env@main
  with:
    input_file: './config.yml'
    pattern: 'double_underscore'
```
Replaces: `__API_URL__`, `__DATABASE_NAME__`, etc.

## With Output File (Copy and Replace)
Create a new file with replaced values instead of modifying the original:

```yaml
name: Generate Configuration

on:
  push:
    branches: [ main ]

env:
  API_URL: "https://api.production.com"

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    # Create new file with replaced values
    - name: Generate configuration
      uses: KingTech/KingTech.GithubActions/replace-env@main
      with:
        input_file: './config/appsettings.template.json'
        output_file: './config/appsettings.json'
```

This keeps your template intact and creates a new configured file.

## With Fail on Missing Variables
Ensure all required environment variables are present:

```yaml
name: Deploy with Validation

on:
  push:
    branches: [ main ]

env:
  API_URL: "https://api.production.com"
  DATABASE_URL: "postgresql://localhost/mydb"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    # Fail if any environment variable is missing
    - name: Replace and validate
      uses: KingTech/KingTech.GithubActions/replace-env@main
      with:
        input_file: './config/app.config'
        fail_on_missing_env: true
```

If your config file references `${MISSING_VAR}` and it's not defined, the workflow will fail.

## Docusaurus Configuration Example
Replace environment variables in Docusaurus configuration files:

```yaml
name: Build Docusaurus with Environment Variables

on:
  push:
    branches: [ main ]

env:
  SITE_NAME: "My Documentation"
  SITE_URL: "https://docs.mycompany.com"
  BASE_URL: "/docs/"
  PROJECT_NAME: "My Project"

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    # Replace environment variables in Docusaurus files
    - name: Configure Docusaurus
      uses: KingTech/KingTech.GithubActions/replace-env@main
      with:
        input_file: |
          ./docusaurus.config.js
          ./sidebars.js
          ./docs
        pattern: 'single_dollar_brackets'

    # Build Docusaurus site with configured values
    - name: Build documentation
      uses: KingTech/KingTech.GithubActions/docusaurus-build@main
      with:
        siteName: ${{ env.SITE_NAME }}
```

Your `docusaurus.config.js` might contain:
```javascript
module.exports = {
  title: '${SITE_NAME}',
  url: '${SITE_URL}',
  baseUrl: '${BASE_URL}',
  projectName: '${PROJECT_NAME}',
  // ... rest of config
};
```

## Kubernetes Deployment Example
Replace environment variables in Kubernetes manifests:

```yaml
name: Deploy to Kubernetes

on:
  push:
    branches: [ main ]

env:
  IMAGE_TAG: ${{ github.sha }}
  NAMESPACE: "production"
  REPLICAS: "3"
  CPU_LIMIT: "500m"
  MEMORY_LIMIT: "512Mi"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    # Configure Kubernetes manifests
    - name: Configure manifests
      uses: KingTech/KingTech.GithubActions/replace-env@main
      with:
        input_file: './k8s'
        fail_on_missing_env: true

    # Apply to cluster
    - name: Deploy to Kubernetes
      run: kubectl apply -f ./k8s
```

Your deployment manifest might contain:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: ${NAMESPACE}
spec:
  replicas: ${REPLICAS}
  template:
    spec:
      containers:
      - name: myapp
        image: myregistry/myapp:${IMAGE_TAG}
        resources:
          limits:
            cpu: ${CPU_LIMIT}
            memory: ${MEMORY_LIMIT}
```

## With Secrets
Use GitHub secrets for sensitive values:

```yaml
name: Configure with Secrets

on:
  push:
    branches: [ main ]

env:
  API_KEY: ${{ secrets.API_KEY }}
  DATABASE_PASSWORD: ${{ secrets.DB_PASSWORD }}
  ENCRYPTION_KEY: ${{ secrets.ENCRYPTION_KEY }}
  PUBLIC_URL: "https://mysite.com"

jobs:
  configure:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Replace secrets and variables
      uses: KingTech/KingTech.GithubActions/replace-env@main
      with:
        input_file: './config/secrets.yml'
        fail_on_missing_env: true
```

## Common Use Cases

### 1. Environment-Specific Configuration
Maintain one template, generate configs for different environments:
```yaml
# For production
env:
  ENV: "production"
  API_URL: "https://api.prod.com"

# For staging
env:
  ENV: "staging"
  API_URL: "https://api.staging.com"
```

### 2. Version Injection
Inject build version into configuration:
```yaml
- name: Get version
  id: version
  uses: KingTech/KingTech.GithubActions/gitversion@main

- name: Update version in files
  env:
    VERSION: ${{ steps.version.outputs.version }}
  uses: KingTech/KingTech.GithubActions/replace-env@main
  with:
    input_file: './src/version.ts'
```

### 3. Dynamic Docker Compose
Generate docker-compose files with environment-specific values:
```yaml
env:
  DB_PORT: "5432"
  REDIS_PORT: "6379"
  APP_PORT: "8080"

steps:
  - name: Configure docker-compose
    uses: KingTech/KingTech.GithubActions/replace-env@main
    with:
      input_file: './docker-compose.template.yml'
      output_file: './docker-compose.yml'
```

## Important Notes
- **No spaces around variable names:** Use `${VAR}`, not `${ VAR }`
- **Case sensitive:** `${API_URL}` is different from `${api_url}`
- **In-place by default:** Original files are modified unless `output_file` is specified
- **Recursive:** Directory processing includes all subdirectories
- **Multiline input:** Use the pipe `|` syntax for multiple files/directories