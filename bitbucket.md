
# **BitBucket Pipeline**


## Installation
 
- Copy bitbucket.yml file from CI folder and paste it into root folder of your project.
- Rename file name from bitbucket.yml to bitbucket-pipelines.yml.
- Open Repository settings from bitbucket.org/[oraganization]/[repo name]
- In repository settings go to Repository Variables and start adding the variables that are mentioned below. 
- Go to pipelines and run the pipeline.

## Environemnt Variables

Following are the secrets that we need to enter manually in Bitbucket repository settings

| Variables | Demo Values |
| ----------| ---------- |
| AccessToken | test-access-token |
| DashUrl | https://618284bd84c2020017d89efd.mockapi.io/api/kics/github |
| LicenseKey | [ Dash Licence Key ] |
| OrganizationCode | [ Dash Organization Code ] |
| Token | [ Bitbucket App Password ] |