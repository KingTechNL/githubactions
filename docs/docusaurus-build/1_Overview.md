---
sidebar_position: 1
---

## docusaurus-build action
The `docusaurus-build` action generates static websites from Markdown files using [Docusaurus](https://docusaurus.io/). This action automates the entire process of creating a Docusaurus site, from initial setup to building the final static HTML/CSS/JavaScript output.

The action creates a new Docusaurus site using the specified template, copies your documentation files (docs, blog posts, static assets, and source files) into the site structure, applies custom configuration and styling, and builds the final output that can be deployed to any static hosting service.

This is particularly useful for automatically generating documentation websites, technical blogs, and knowledge bases directly from your repository's Markdown files as part of your CI/CD pipeline.

### Inputs
This action has extensive configurability, allowing you to use the KingTech docusaurus template, or pass your own. Because of this, the inputs can be grouped as follows:

#### Directory/file Configuration
The directories that are used for the source files to build documentation from and store the output files.

| Input | Required | Default | Description |
| ----- | -------- | ------- | ----------- |
| `docsDir` | No | '' | The directory where the documentation Markdown files are stored. If empty, looks for a `docs/` folder in the workspace. The '-' wild card can be used to keep the default generated docs folder. |
| `blogDir` | No | '' | The directory where blog post Markdown files are stored. If empty, looks for a `blog/` folder in the workspace. The '-' wild card can be used to keep the default generated blog folder. |
| `srcDir` | No | '' | The directory where custom React components and pages are stored. If empty, looks for a `src/` folder in the workspace. The '-' wild card can be used to keep the default generated src folder. |
| `staticDir` | No | '' | The directory containing static assets (images, CSS, etc.). If empty, looks for a `static/` folder in the workspace. The '-' wild card can be used to keep the default generated static folder. |
| `targetDir` | Yes | `${{ github.workspace }}/publish` | The output directory where the generated static website will be stored. |

#### Docusaurus build Configuration
These inputs correspond to the `create-docusaurus` command that is executed as part of this command. For more details, please check the official [Docusaurus installation documentation](https://docusaurus.io/docs/installation).

| Input | Required | Default | Description |
| ----- | -------- | ------- | ----------- |
| `docusaurusVersion` | No | 'latest' | The version of Docusaurus to use for building the site. |
| `docusaurusVariant` | No | 'javascript' | The template variant to use: 'javascript' or 'typescript'. |
| `docusaurusTemplate` | No | 'classic' | The Docusaurus template to use (typically 'classic'). |
| `nodeVersion` | No | 'latest' | The Node.js version to use for building the site. |
| `npmCache` | No | '' | Path to npm cache directory to speed up dependency installation. |

#### KingTech Docusaurus template
The following parameters will only be used if the KingTech docusaurus template is used.
This template is relatively vanilla and can be configured to your needs. If the template does not suit your needs, ignore these inputs and pass your own docusaurus config files instead.

| Input | Required | Default | Description |
| ----- | -------- | ------- | ----------- |
| `siteName` | No | 'my-website' | The name of your website, used in the site title and metadata. |
| `projectName` | No | (same as siteName) | The project name displayed in the navbar. Defaults to the site name if not specified. |
| `url` | No | 'https://www.kingtech.nl' | The full URL where the site will be hosted (e.g., 'https://www.example.com'). |
| `baseUrl` | No | '/' | The base URL path if hosting on a subpath (e.g., '/docs/' for https://example.com/docs/). |
| `customCss` | No | '' | Path to a custom CSS file for styling the generated website. |
| `brand` | No | '' | The brand name to display in the generated website. |
| `logo` | No | '' | Path to the logo image file to use in the website header. |
| `favicon` | No | '' | Path to the favicon icon file. |

#### Custom docusaurus
In case you don't want to use the KingTech Docusaurus templates, it is possible to pass your own config and sidebars files.

| Input | Required | Default | Description |
| ----- | -------- | ------- | ----------- |
| `configFile` | No | '' | Path to a custom `docusaurus.config.js` file. If not specified, uses the default template configuration. |
| `sideBarsFile` | No | '' | Path to a custom `sidebars.js` file defining the documentation sidebar structure. If not specified, uses the default template. |
| `replaceEnv` | No | 'false' | Whether to replace environment variable placeholders in configuration files (e.g., `${SITE_NAME}`). |