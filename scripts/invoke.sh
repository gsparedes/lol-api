#!/usr/bin/env node

./node_modules/serverless/bin/serverless.js invoke local -f $1 --path events/$1.json