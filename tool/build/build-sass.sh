#! /bin/bash

entries=(`find ./src/style/entry/* -type f -name "*.sass" -print`)
echo $entries

for entry in ${entries[@]}; do
    entryPath=`echo $entry | cut -c "7-${#entry}"`
    entryName=`echo $entry | cut -c "19-$((${#entry} - 5))"`
    entryDir=`echo $entryPath | cut -c "1-$((${#entryPath} - ${#entryName} - 5))"`
    node-sass "$entry" "./dist/$entryDir$entryName.css"
done
