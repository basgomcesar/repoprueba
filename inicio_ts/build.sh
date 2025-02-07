#!/bin/bash

set -e
set -x

yarn install
npm test
npm lint
