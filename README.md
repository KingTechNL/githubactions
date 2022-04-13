# githubactions
Repository containing actions used by KingTech for its CI/CD pipelines.

## base-action
The base action represents a combined flow of actions that makes for an easy and complete CI/CD flow.

- First, all .net projects are [built and tested](##dotnet-build-test). A test report is generated and published.
- Next, a version number is generated using [gitversion](##gitversion). 
- Using this version number, all nuget projects (based on the project name ending with .NuGet.csproj) are [packed and published](##publish-nuget). 
- Finally, if a docker api-key is passed, all docker files are [build an published](##publish-docker).



## dotnet-build-test
This action builds all dotnet projects within the repository and runs the unittest projects.
It will result in a "DotNET Test" report that shows the result of each test.

| Input | Default | Description |
| -- | -- | -- |
| dotnet_version | "6.0.x" | The dotnet version of the project to build and test. |
| test_output | "test-results.trx" | Output file for test results, used for report generation. |
| build_version | "" | Version to append to build action. |

## gitversion
This action calculates the version number of the build it is triggered for based on GitVersion.
In order to impact the versioning, the following _optional_ inputs can be passed.

| Input | Default | Description |
| -- | -- | -- |
| targetPath | "" | Optionally supply the path to the working directory. |
| useConfigFile | false | Whether to use a custom configuration file. |
| configFilePath | "GitVersion.yml" | Optional path to config file (defaults to GitVersion.yml). |
| updateAssemblyInfo | false | Whether to update versions in the AssemblyInfo files. |
| updateAssemblyInfoFilename | "" | Update versions in specified file. |
| additionalArguments | "" | Additional arguments to send to GitVersion. |

Its output features the following (sub)version numbers:

| Output | Example |
| -- | -- |
| Major | 0 |
| Minor | 1 |
| Patch | 0 |
| PreReleaseTag | "" |
| PreReleaseTagWithDash | "" |
| PreReleaseLabel | "" |
| PreReleaseLabelWithDash | "" |
| PreReleaseNumber | null |
| WeightedPreReleaseNumber | 60000 |
| BuildMetaData | 41 |
| BuildMetaDataPadded | "0041" |
| FullBuildMetaData | "41.Branch.main.Sha.3b9fb4b8b1002c6df692678390d09000fe3b9053" |
| MajorMinorPatch | "0.1.0" |
| SemVer | "0.1.0" |
| LegacySemVer | "0.1.0" |
| LegacySemVerPadded | "0.1.0" |
| AssemblySemVer | "0.1.0.0" |
| AssemblySemFileVer | "0.1.0.0" |
| FullSemVer | "0.1.0+41" |
| InformationalVersion | "0.1.0+41.Branch.main.Sha.3b9fb4b8b1002c6df692678390d09000fe3b9053" |
| BranchName | "main" |
| EscapedBranchName | "main" |
| Sha | "3b9fb4b8b1002c6df692678390d09000fe3b9053" |
| ShortSha | "3b9fb4b" |
| NuGetVersionV2 | "0.1.0" |
| NuGetVersion | "0.1.0" |
| NuGetPreReleaseTagV2 | "" |
| NuGetPreReleaseTag | "" |
| VersionSourceSha | "619feb6b837752d83bd4cfad33fa96c9e1caebaf" |
| CommitsSinceVersionSource | 41 |
| CommitsSinceVersionSourcePadded | "0041" |
| UncommittedChanges | 5 |
| CommitDate | "2022-04-09" |


> :warning: **NOTE:**
For the GitVersion workflow to execute successfully, you must checkout your Git repository with fetch-depth: 0 to fetch all history for all tags and branches, as follows:
```
steps:
  - name: Checkout
    uses: actions/checkout@v2
    with:
      fetch-depth: 0
```

## publish-nuget
This action packs and publishes all NuGet projects in the repository. The projects to pack and publish can be passed using the input parameters. But if they are not, the action searches for any projects with names ending in .NuGet.csproj. 

| Input | Default | Description |
| -- | -- | -- |
| nuget_projects | "" | Names of all projects to publish as NuGet, delimited by ; |
| nuget_version* | | Version number for NuGet package. |
| nuget_api_source | "https://www.nuget.org" | NuGet server uri hosting the packages. |
| nuget_api_key* | | API key to authenticate with NuGet server. |

## publish-docker
This action builds and publishes a docker image.

| Input | Default | Description |
| -- | -- | -- |
| registry_username* | | Username for image registry |
| registry_password* | | Password for image registry |
| image_name* | | Name of the image to push |
| tags | "latest" | How to tag the image. Tags are delimited with ; |
| docker_file | "Dockerfile" | name of the dockerfile to use. |