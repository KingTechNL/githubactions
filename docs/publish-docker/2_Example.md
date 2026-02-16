---
sidebar_position: 2
---

# Example
The `publish-docker` action is used as follows:

```
    - name: docker build
      uses: kingtechnl/githubactions/publish-docker@main
      with:
        registry_username: "${{ secrets.DOCKERHUB_USERNAME }}"
        registry_password: "${{ secrets.DOCKERHUB_TOKEN }}"
        image_name: "myDockerImage"
        tag: "latest" #Optional
        docker_file: "Dockerfile" #Optional
```