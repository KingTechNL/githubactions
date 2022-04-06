# githubactions
Repository containing actions used by multiple other projects.

## dotnet-build-test
This action builds all dotnet projects within the repository and runs the unittest projects.
It will result in a "DotNET Test" report that shows the result of each test.

## publish-docker
This action builds and publishes a docker image.

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