
# **GitHub Action**


## Installation

- Make '.github/workflows' directory in root folder of your project. 
- Copy github.yml file from CI folder and paste it into workflows folder that you just created.
- Open Github repository settings from github.com/[oraganization]/[repo name]
- In repository settings go to Secrets > New Repository Secret and enter the variables that are mentioned below. 

## Environemnt Variables

Following are the secrets that we need to enter manually in Github repository settings

| Variables | Demo Values |
| ----------| ---------- |
| AccessToken | test-access-token |
| DashUrl | https://618284bd84c2020017d89efd.mockapi.io/api/kics/github |
| LicenseKey | [ Dash Licence Key ] |
| OrganizationCode | [ Dash Organization Code ] |
| Token | [ Github Access Token ] |