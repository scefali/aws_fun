#!/bin/sh


#hacky way to delete unwanted files
rm dist/*.hot-update*
aws s3 sync dist/ s3://www.awsfun.click/dist
aws s3 cp public/index.html s3://www.awsfun.click
claudia update