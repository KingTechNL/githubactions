---
sidebar_position: 2
---

# Example
The `docusaurus/build` action is used as follows:

```
  - name: Build docusaurus site
    id: build_docusaurus
    uses: kingtechnl/githubactions/docusaurus/build@main
    with:
      sourceDir: 'docs' #Directory the source files are stored in.
      targetDir: 'build' #Directory the generated website will be stored in.
      siteName: 'my-website' #Optional name for website, default: my-website
      version: 'latest' #Optional docusaurus version, default: latest
      variant: 'javascript' #Optional docusaurus variant, default: javascript
      template: 'classic' #Optional docusaurus template, default: classic
```