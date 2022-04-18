# dashsdk-iac-scann-assets
All artifacts, codes and supporting documents for activities pertaining to DaskSDK Infrastructure as Code scanning module using Kics library and AWS Integrations.

## Pre-Reqs & Assumptions 
- S3 Bucket should be provisioned for storing IaC (Infrastructure as Code) Scanning results
- Docker image with Kics installed should be available in a public image repository (e.g. Amazon ECR, Docker Hub)
- Lambda Function code should be bundled and uploaded to S3 Bucket
- Github repository with Github Workflow already setup
- Github Actions will only show the execution result of Lambda Function and S3 path scan results will be uploaded to

## Integration into different CIs
- Github -> [Github Action]
- Gitlab -> [Gitlab CI]
- Bitbucket -> [Bitbucket Pipeline]

[Github Action]: <https://github.com/RipeSeed/dashsdk-iac-scann-assets/blob/main/docs/github.md>
[Gitlab CI]: <https://github.com/RipeSeed/dashsdk-iac-scann-assets/blob/main/docs/gitlab.md>
[Bitbucket Pipeline]: <https://github.com/RipeSeed/dashsdk-iac-scann-assets/blob/main/docs/bitbucket.md>