# githubactions
Repository containing actions used by multiple other projects.

## base-action
The base action represents a combined flow of actions that makes for an easy and complete CI/CD flow.

- First, all .net projects are [built and tested](##dotnet-build-test). A test report is generated and published.
- Next, a version number is generated using [gitversion](##gitversion). 
- Using this version number, all nuget projects (based on the project name ending with .NuGet.csproj) are [packed and published](##publish-nuget). 
- Finally, if a docker api-key is passed, all docker files are [build an published](##publish-docker).



## dotnet-build-test
This action builds all dotnet projects within the repository and runs the unittest projects.
It will result in a "DotNET Test" report that shows the result of each test.

## gitversion
This action calculates the version number of the build it is triggered for based on GitVersion.
Its output features the following (sub)version numbers:
- major
- minor
- patch
- preReleaseTag
- preReleaseTagWithDash
- preReleaseLabel
- preReleaseNumber
- weightedPreReleaseNumber
- buildMetaData
- buildMetaDataPadded
- fullBuildMetaData
- majorMinorPatch
- semVer
- legacySemVer
- legacySemVerPadded
- assemblySemVer
- assemblySemFileVer
- fullSemVer
- informationalVersion
- branchName
- escapedBranchName (since 5.2.0)
- sha
- shortSha
- nuGetVersionV2
- nuGetVersion
- nuGetPreReleaseTagV2
- nuGetPreReleaseTag
- versionSourceSha
- commitsSinceVersionSource
- commitsSinceVersionSourcePadded (since 5.2.0)
- uncommittedChanges (since 5.5.0)
- commitDate

## publish-nuget

## publish-docker
This action builds and publishes a docker image.