---
sidebar_position: 2
---

# Example
The `publish-nuget` action is used as follows:

```
    ### Generate version number for repo
    - name: Get version
      id: get_version
      uses: kingtechnl/githubactions/gitversion@main

    ### Print version number   
    - name: Print version
      shell: bash
      run: echo Generated version ${{ steps.get_version.outputs.version }}
```