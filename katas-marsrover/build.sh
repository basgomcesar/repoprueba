#!/bin/bash

set -e
set -x

npm install
npm run test
npm run lint
