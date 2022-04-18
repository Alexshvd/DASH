"use strict";

const S3_PREFIX = "s3://" + process.env.S3Bucket + "/" + process.env.S3Path;

const SUBNET_ID = process.env.SubnetId;
const FARGATE_CLUSTER = process.env.FargateClusterName;
const FARGATE_TASK_DEF_NAME = process.env.TaskDefinitionName;
const CONTAINER_NAME = process.env.ContainerName;

const AWS = require("aws-sdk");
const fetch = require("node-fetch");
let base64 = require('base-64');

const ECS = new AWS.ECS();

const executeFargateJob = async (
  ghToken,
  ghRepo,
  ghUserName,
  outFilename,
  outPath,
  s3Path,
  dashUrl,
  dashAccessKey,
  branch,
  sha,
  message,
  time,
  author,
  host="github.com"
) => {
  
  /**
   * 
   * Branch name
   * Commit hash
   * Commit message
   * Commit date
   * Commit author username
   * 
   */
  
  const res = await ECS.runTask({
    cluster: FARGATE_CLUSTER,
    launchType: "FARGATE",
    taskDefinition: FARGATE_TASK_DEF_NAME,
    count: 1,
    platformVersion: "LATEST",
    networkConfiguration: {
      awsvpcConfiguration: {
        subnets: [SUBNET_ID],
        assignPublicIp: "ENABLED",
      },
    },
    overrides: {
      containerOverrides: [
        {
          name: CONTAINER_NAME,
          environment: [
            {
              name: "GITHUB_API_TOKEN",
              value: ghToken,
            },
            {
              name: "GITHUB_REPO",
              value: ghRepo,
            },
            {
              name: "GITHUB_USER_NAME",
              value: ghUserName,
            },
            {
              name: "OUTPUT_FILE_NAME",
              value: outFilename,
            },
            {
              name: "OUTPUT_PATH",
              value: outPath,
            },
            {
              name: "S3_PATH",
              value: s3Path,
            },
            {
              name: "DASH_ENDPOINT",
              value: dashUrl,
            },
            {
              name: "DASH_ACCESS_KEY",
              value: dashAccessKey,
            },
            {
              name: "S3_KEY",
              value: process.env.S3Path + "/" + outFilename,
            },
            {
              name: "S3_BUCKET",
              value: process.env.S3Bucket,
            },
            {
              name: "BRANCH",
              value: branch,
            },
            {
              name: "SHA",
              value: sha,
            },
            {
              name: "MESSAGE",
              value: message,
            },
            {
              name: "TIME",
              value: time,
            },
            {
              name: "AUTHOR",
              value: author,
            },
            {
              name: "HOST",
              value: host,
            },
          ],
        },
      ],
    },
  }).promise();

  return res;
};

const verifyLicence = ({ organizationCode, licenceKey }) => {
  return fetch('https://admin.dashsdk.com/api/auth/organization/token', {
    method:'POST',
    headers: {'Authorization': 'Basic ' + base64.encode(organizationCode + ":" + licenceKey)}
  });
}

exports.handler = async (event) => {
  console.log("Event:", JSON.stringify(event));

  const time_now = new Date().toISOString();
  
  const { Repository, Token, OrganizationCode, LicenceKey, DashUrl, AccessToken, Branch, SHA, Message, Author, Host } = event;

  try {
    const res = await verifyLicence({
      organizationCode: OrganizationCode,
      licenceKey: LicenceKey
    })
    if(res.status !== 201) {
      const msg = "Request not authorized. Organization Code and Licence key invalid or not provided.";
      console.log("msg:", msg);
      console.log("res.status:", res.status);
      return {
        statusCode: res.status,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          Message: msg
        }),
      };
    }
    console.log('res:', res);
  } catch(e) {
    console.log("e:", e)
    console.log("e.code:", e.code)
    const msg = "Validation Request failed!";
    console.log("msg:", msg);
    return {
      statusCode: 400,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        Message: msg
      }),
    };
  }
  
  // Full repository path - user/repo/
  const github_repo = Repository;
  const github_repo_name = github_repo.split("/")[-1];
  const github_user_name = github_repo.split("/")[0];

  // Check if Github Token provided from Github Actions Workflow
  if (!Token) {
    print("Github User API Token not received. Terminating execution");
    return {
      statusCode: 400,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        Message: `Repo ${github_repo} scanning not initiated`,
        Error: "Github User Token not accessible",
      }),
    };
  }
  let github_token = Token;

  // S3 Path building
  const s3_path = S3_PREFIX + github_repo;

  // Output files name
  const output_file_name = `iac_${time_now}_scan`;
  const output_path = github_repo;

  console.log("Starting job...");
  await executeFargateJob(
    github_token,
    github_repo,
    github_user_name,
    output_file_name,
    output_path,
    s3_path,
    DashUrl,
    AccessToken,
    Branch,
    SHA,
    Message,
    Author,
    (new Date()).toISOString(),
    Host,
  );
  console.log("Job Finished...");

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      Message: `Repo ${github_repo} scanning initiated`,
      S3Path: `KICS IaC scans results will be uploaded to path: ${s3_path}`,
    }),
  };
};
