# Example
The `base-action` is used as follows:

```
    - name: main action
      if: success()
      uses: kingtechnl/githubactions/base-action@main
      with:
        docker_registry_username: "${{ secrets.DOCKERHUB_USERNAME }}"
        docker_registry_password: "${{ secrets.DOCKERHUB_TOKEN }}"
        docker_image_name: "myDockerImage"
        nuget_api_key: "${{ secrets.NUGETORG_TOKEN }}"
```