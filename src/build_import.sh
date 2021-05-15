#!/bin/bash

FILE=./out.json
SCRIPTS=./scripts
OUT=./template.json
declare -a USERSCRIPTS=($(find ${SCRIPTS} -type f -name '*.js' | sort -u))
declare -a JSONS=($(find ${SCRIPTS} -type f -name '*.json' | sort -u))

# Get and fill each json with corresponding js code
declare -a OUT_JSON=()
for ((i = 0; i < ${#JSONS[@]}; i++)); do
    OUT_JSON+=("$(sed -e "s,{{ SOURCE }},$(base64 "${USERSCRIPTS[i]}" -w 0),g" "${JSONS[i]}")")
done

# Concatenate scripts jsons
OUT_STR=""
for ((i = 0; i < ${#OUT_JSON[@]} - 1; i++)); do
    OUT_STR+="${OUT_JSON[i]},"
done
OUT_STR+="${OUT_JSON[-1]}"

# Exporting to file
sed "s~{{ SCRIPTS }}~${OUT_STR//$'\n'}~" "${OUT}" > ${FILE}
