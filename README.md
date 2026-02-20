# KingTech GitHub Actions

A collection of reusable GitHub Actions designed to standardize and streamline CI/CD pipelines across KingTech products and websites. These actions automate common tasks including building, testing, versioning, and deploying .NET applications, Docker images, NuGet packages, and documentation sites.

## Available Actions

- **base-action** - All-in-one CI/CD pipeline combining build, test, version, and deployment
- **dotnet-build-test** - Build and test .NET projects with automated test reporting
- **gitversion** - Automatic semantic versioning based on Git history
- **publish-nuget** - Package and publish NuGet packages
- **publish-docker** - Build and push multi-platform Docker images
- **docusaurus-build** - Generate static documentation sites with Docusaurus
- **deploy-pages** - Deploy static websites to GitHub Pages
- **replace-env** - Replace environment variable placeholders in configuration files

## Documentation

Full documentation with detailed examples is available at **[actions.kingtech.nl](https://actions.kingtech.nl/)**

## Quick Start

```yaml
- uses: KingTech/KingTech.GithubActions/<action-name>@main
  with:
    # action-specific inputs
```

## Contributing

Documentation is written in the `/docs` directory using Markdown and published via Docusaurus.

