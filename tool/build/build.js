/**
 * ビルドスクリプト
 */

const fs = require('fs')
const child_process = require('child_process')
async function exec (command, display) {
    return new Promise((resolve, reject) => {
        child_process.exec(command, (error, stdout, stderr) => {
            if (display) {
                console.log(stdout)
            }

            if (stderr) {
                if (display) {
                    console.log(stderr)
                }
                reject(stderr)
                return
            }

            resolve(stdout)
        })
    })
}

async function build() {
    try {
        // クリーンビルド
        await exec('dir=./dist; [ ! -e $dir ] && mkdir $dir; find ./dist -maxdepth 1 -print | grep -E "./dist/.+" | xargs -I{} rm -rf {}')

        // リソースコピー
        await exec('rsync -a ./src/ ./dist/ --exclude "/script/" --exclude "/style/" --exclude "*.pug"', true)
        console.log("-------------------- resource copy done --------------------")

        // ts
        await exec('npm run build-ts', true)
        console.log("-------------------- typescript done --------------------")

        try {
            // webpack
            await exec('npm run webpack', true)
            console.log("-------------------- webpack done --------------------")
        } catch(e) {}

        // pug
        await exec('npm run build-pug', true)
        console.log("-------------------- build pug done --------------------")

        try {
            // sass
            await exec('npm run build-sass', true)
            console.log("-------------------- build sass done --------------------")
        } catch(e) {}

        await exec('rm -rf src/script-es5')
        console.log("-------------------- build success --------------------")
    } catch(e) {
        console.error("-------------------- build failed --------------------")
        console.error(e)
    }
}
build()
