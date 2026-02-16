---
sidebar_position: 2
---

# Example
The `publish-nuget` action is used as follows:

```
    - name: Build and publish NuGet projects
      uses: kingtechnl/githubactions/publish-nuget@main
      with:
        nuget_version: 1.0.0
        nuget_api_source: "https://www.nuget.org"
        nuget_api_key: ${{ secrets.NUGET_API_KEY }}
```