#! /bin/bash
npm init

npm install --save riot jquery
npm install --save-dev babel-core babel-loader babel-preset-es2015\
        babel-preset-es2015-riot node-sass pug pug-cli riot-tag-loader tsc webpack
node ./install-npm-script.js

rm ./install.sh
rm ./install-npm-script.js
