const fs = require('fs')

var json = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

json["scripts"] = {}
json["scripts"]["build"] = "node tool/build/build.js"
json["scripts"]["build-ts"] = "rsync -a --exclude '*.ts' ./src/script/ ./src/script-es6; tsc -p src/ --outDir ./src/script-es6"
json["scripts"]["webpack"] = "webpack --progress"
json["scripts"]["build-pug"] = "pug --hierarchy -o ./dist/ ./src/"
json["scripts"]["build-sass"] = "./tool/build/build-sass.sh"
json["scripts"]["build-typedoc"] = "build-typedoc": "cd ./src; typedoc --name 'doc-web' --mode 'file' --out '../document/typedoc' './'"

fs.writeFileSync("./package.json", JSON.stringify(json, null, 4));
