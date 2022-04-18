#!/bin/bash

kics scan -p git::https://${GITHUB_USER_NAME}:${GITHUB_API_TOKEN}@${HOST}/${GITHUB_REPO}?ref=${BRANCH} --report-formats "json,html" -o "./${GITHUB_REPO}" --output-name "${OUTPUT_FILE_NAME}"
mv ./$GITHUB_REPO/$OUTPUT_FILE_NAME $GITHUB_REPO/$OUTPUT_FILE_NAME.json
aws s3 cp  ./${GITHUB_REPO}  ${S3_PATH} --recursive
# curl --location --request POST ${DASH_ENDPOINT} \
#   --header "Authorization: ${DASH_ACCESS_KEY}" \
#   --form "s3Key=\"${S3_KEY}\"" \
#   --form "s3Bucket=\"${S3_BUCKET}\"" \
#   --form "branch=\"${BRANCH}\"" \
#   --form "sha=\"${SHA}\"" \
#   --form "author=\"${AUTHOR}\"" \
#   --form "message=\"${MESSAGE}\"" \
#   --form "time=\"${TIME}\"" \
#   --form "jsonResults=\"$(cat $GITHUB_REPO/$OUTPUT_FILE_NAME.json).json\""
 curl -X POST ${DASH_ENDPOINT} -d \
 "access_token=$DASH_ACCESS_KEY&scan_type=kics&scan_data=$(cat ./$GITHUB_REPO/$OUTPUT_FILE_NAME.json)"