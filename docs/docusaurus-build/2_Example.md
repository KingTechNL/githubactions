---
sidebar_position: 2
---

# Example
The `replace-env` action is used as follows:

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