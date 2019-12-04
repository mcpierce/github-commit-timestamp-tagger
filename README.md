# Github Commit Timestamp Tagger

This action met a very simple need I had that nothing else seemed to do: it generates
a tag for commits on a branch where the tagname is composed of a base version and
a timestamp.

Nothing fancy. Just a way to tag commits to, for example, a development branch so
a build can be produced for each merge.

## Inputs

 * **base_version** - The root text to use when creating the tag; i.e., **v0.5.0**

## Outputs
 * **tag_name** - The generated tag; i.e., **v0.5.0-20191204081223**
 * **tag_hash** - The commit hash for the tag.
 * **tag_time** - The timstamp from the tag; i.e., **20191204081223**

## Usage

Add a workflow file like the following to your project:

```
name: "Tag commits on develop"

on:
  push:
    branches:
      - develop

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Apply a tag to the new commit
      uses: mcpierce/github-commit-timestamp-tagger@master
      with:
        repo-token: "${{ secrets.GITHUB_TOKEN }}"
        base_version: "v0.5.0"
```
