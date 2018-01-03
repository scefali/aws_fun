#!/bin/sh


#hacky way to delete unwanted files
rm dist/*.hot-update*
aws s3 sync dist/ s3://awsfun.click/dist
aws s3 cp index.html s3://awsfun.click
# claudia update