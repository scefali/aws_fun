#!/bin/sh

set -a
. ./.env
set +a


#hacky way to delete unwanted files
# rm dist/*.hot-update*
# npm run build
# aws s3 sync dist/ s3://www.awsfun.click/dist
# aws s3 cp public/ s3://www.awsfun.click/  --recursive
# claudia update

export SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
export SENTRY_ORG=$SENTRY_ORG


VERSION=$RELEASE_NUMBER
#COMMITS=$(sentry-cli releases propose-version)

# Create a release
sentry-cli releases new -p ${SENTRY_PROJECT} $VERSION


# Associate commits with the release
sentry-cli releases set-commits --auto $VERSION

sentry-cli releases deploys $VERSION new -e PROD
