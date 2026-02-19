---
slug: /
sidebar_position: 1
---

# Overview
The KingTech Actions project is a collection of reusable GitHub Actions designed to standardize and streamline CI/CD pipelines across all KingTech products and websites. By centralizing these common automation tasks, development teams can focus on building features rather than maintaining duplicate pipeline configurations.

This project addresses the typical challenges in a multi-product software organization: ensuring consistent build processes, maintaining version control standards, automating testing and deployment, and reducing the complexity of Docker and NuGet package publishing. Whether you're deploying a .NET microservice, publishing a documentation website, or releasing a NuGet package, these actions provide a battle-tested, standardized approach.

## What are GitHub Actions?
GitHub Actions is a continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline. You can create workflows that build and test every pull request to your repository, or deploy merged pull requests to production.

GitHub Actions goes beyond just DevOps and lets you run workflows when other events happen in your repository. For example, you can run a workflow to automatically add the appropriate labels whenever someone creates a new issue in your repository.

GitHub provides Linux, Windows, and macOS virtual machines to run your workflows, or you can host your own self-hosted runners in your own data center or cloud infrastructure. Workflows are defined using YAML syntax and are stored in the `.github/workflows` directory of your repository.

## Using These Actions in Your Projects
All actions in this repository are designed to be reusable and can be easily integrated into your own GitHub workflows. Whether you're working on a KingTech project or an external repository, you're welcome to leverage these actions to accelerate your development and deployment processes.

To use any action from this repository, simply reference it in your workflow file using the standard GitHub Actions syntax:

```yaml
- uses: KingTech/KingTech.GithubActions/<action-name>@main
  with:
    # action-specific inputs
```

Each action is thoroughly documented with detailed examples, input parameters, and usage scenarios. Browse the documentation for each action to find the one that fits your needs, review the example usage files, and adapt them to your specific requirements.

By reusing these actions, you benefit from tested and maintained automation patterns without having to build everything from scratch. Feel free to explore, experiment, and incorporate them into your CI/CD pipelines!