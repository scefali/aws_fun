#!/bin/sh


#aws cloudfront create-invalidation --distribution-id ELEOP2ZWWVZ44 --paths /index.html /js/* /js/bundle.js
aws s3 sync static/ s3://awsfun.click