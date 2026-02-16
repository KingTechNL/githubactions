---
sidebar_position: 2
---

# Example
The `dotnet-build-test` action is used as follows:

```
    - name: .NET Test
      uses: kingtechnl/githubactions/dotnet-build-test@main
      with:
        test-output: ${{env.TEST_OUTPUT}}
```