#!/bin/bash

npx @openapitools/openapi-generator-cli generate \
    -i api-docs.json \
    -g typescript-fetch \
    -o /home/moon/Projects/music_play/frontend/src/scripts/api
