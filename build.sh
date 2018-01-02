#!/bin/sh


aws s3 sync dist/ s3://awsfun.click/dist
aws s3 cp index.html s3://awsfun.click
# claudia update