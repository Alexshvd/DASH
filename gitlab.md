
# **GitLab CI**


## Installation
 
- Copy gitlab.yml file from CI folder and paste it into root folder of your project.
- Rename file name from gitlab.yml to .gitlab-ci.yml.
- Open settings > CI/CD from gitlab.com/[oraganization]/[repo name]
- Expand Variables section and start adding environment variables that are mentioned below.
- Go to CI/CD tab > Pieplines and run the pipeline.

## Environemnt Variables

Following are the secrets that we need to enter manually in Gitlab repository settings

| Variables | Demo Values |
| ----------| ---------- |
| AccessToken | test-access-token |
| DashUrl | https://618284bd84c2020017d89efd.mockapi.io/api/kics/github |
| LicenseKey | [ Dash Licence Key ] |
| OrganizationCode | [ Dash Organization Code ] |
| Token | [ Gitlab Access Token ] |