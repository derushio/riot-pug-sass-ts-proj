const fs = require('fs')

var json = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

json["scripts"] = {}
json["scripts"]["build"] = "./scripts test_build"
json["scripts"]["clean"] = "./scripts clean"
json["scripts"]["clean_build"] = "./scripts clean_build"
json["scripts"]["build_typedoc"] = "./scripts build_typedoc"

fs.writeFileSync("./package.json", JSON.stringify(json, null, 4));
