#!/bin/bash

set -x

FILE=./out.json
SCRIPTS=./scripts
USERSCRIPTS=($(find ${SCRIPTS} -type f -name *.js | sort -u))
JSONS=($(find ${SCRIPTS} -type f -name *.json | sort -u))

echo -e '{"created_by": "tm", "version": "1", "scripts": [' > ${FILE}

echo $USERSCRIPTS
