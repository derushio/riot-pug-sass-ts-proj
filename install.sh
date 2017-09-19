#! /bin/bash
npm init

npm install --save riot jquery
npm install --save-dev babel-core babel-preset-es2017 babel-preset-es2015\
        node-sass pug pug-cli typescript tsc webpack typedoc
node ./install-npm-script.js

rm ./install.sh
rm ./install-npm-script.js
