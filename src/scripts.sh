#!/bin/bash

SUCCESS=0
FAIL=1

PROJ_NAME="proj"
SRC_DIR="."
DIST_DIR="$SRC_DIR/../dist"
TMP_DIR="$SRC_DIR/../tmp"

function deploy_dirs() {
    [ ! -e "$DIST_DIR" ] && mkdir "$DIST_DIR"
    [ ! -e "$TMP_DIR" ] && mkdir "$TMP_DIR"
}

function clean() {
    find "$DIST_DIR" -maxdepth 1 -print | \
        grep -E "$DIST_DIR/.+" | \
        xargs -I{} rm -rf {}

    find "$TMP_DIR" -maxdepth 1 -print | \
        grep -E "$TMP_DIR/.+" | \
        xargs -I{} rm -rf {}
}

function resource_copy() {
    rsync -a "$SRC_DIR" "$DIST_DIR/" --exclude "/script/" --exclude "/style/" \
        --exclude "riot.config.js" --exclude "scripts.sh" --exclude "tsconfig.json" \
        --exclude "webpack.config.babel.js" --exclude "webpack.config.babel.js" \
        --exclude ".babelrc" --exclude "package.json" --exclude "package-lock.json" \
        --exclude "/node_modules/" --exclude "*.pug"
}

function module_copy {
    cp "$SRC_DIR/package.json" "$TMP_DIR/package.json"
    rsync -a "$SRC_DIR/node_modules/" "$TMP_DIR/node_modules"
}

function module_install {
    cp "$SRC_DIR/package.json" "$TMP_DIR/package.json"
    now=`pwd`
    cd "$TMP_DIR"
    npm install
    cd "$now"
}

function build_pug() {
    entries=(`find $SRC_DIR/* -type d -name "node_modules" -prune -o -type f -name "*.pug" -print`)
    echo $entries

    for entry in ${entries[@]}; do
        regix="\./?(.*)/((.*)\.pug)"

        if [[ $entry =~ $regix ]]
        then
            entryDir="${BASH_REMATCH[1]}"
            entryFile="${BASH_REMATCH[2]}"
            entryName="${BASH_REMATCH[3]}"
            pug --hierarchy -o "$DIST_DIR/$entryDir" "$entry"
        fi
    done
}

function build_riot() {
    riot --config "riot.config.js"
    find "$TMP_DIR/script/" -type f -name "*.js" | \
    while read f; do
        mv "$f" "${f%.*}.ts"
    done
}

function script_copy() {
    rsync -a "$SRC_DIR/script/" "$TMP_DIR/script/" --exclude "/tag/"
    cp "$SRC_DIR/tsconfig.json" "$TMP_DIR/tsconfig.json"
}

function exec_webpack() {
    webpack --progress
}

function build_sass() {
    entries=(`find $SRC_DIR/style/entry/* -type f -name "*.sass" -print`)
    echo $entries


    for entry in ${entries[@]}; do
        regix="\./(style/entry/?.*)/((.*)\.sass)"

        if [[ $entry =~ $regix ]]
        then
            entryDir="${BASH_REMATCH[1]}"
            entryFile="${BASH_REMATCH[2]}"
            entryName="${BASH_REMATCH[3]}"
            node-sass "$entry" "$DIST_DIR/$entryDir/$entryName.css"
        fi
    done
}

function marge_source_map() {
    node "$SRC_DIR/tool/build/margeSourceMap.js"
}

function delete_tmp() {
    rm -rf "$TMP_DIR"
}

function test_build() {
    deploy_dirs
    resource_copy
    module_copy
    build_pug
    build_sass
    build_riot
    script_copy
    exec_webpack
}

function clean_build() {
    deploy_dirs
    clean
    resource_copy
    module_install
    build_pug
    build_sass
    build_riot
    script_copy
    exec_webpack
    delete_tmp
}

function build_typedoc() {
    typedoc --name "$PROJ_NAME" --mode "file" --out "../document/typedoc" "$SRC_DIR"
}

$1
exit "$SUCCESS"
