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
        await exec('dir=./tmp; [ -e $dir ] && rm -rf $dir; mkdir $dir')
        await exec('dir=./tmp/script; [ -e $dir ] && rm -rf $dir; mkdir $dir')
        await exec('dir=./tmp/script-es5; [ -e $dir ] && rm -rf $dir; mkdir $dir')

        await Promise.all([
            (async () => {
                // リソースコピー
                await exec('rsync -a ./src/ ./dist/ --exclude "/script/" --exclude "/style/" --exclude "*.pug"', true)
                console.log("-------------------- resource copy done --------------------")
            })(),
            (async () => {
                // pug
                await exec('npm run build-pug', true)
                console.log("-------------------- build pug done --------------------")
            })(),
            (async () => {
                // script
                await Promise.all([
                    (async () => {
                        // riot
                        await exec('npm run build-riot', true)
                        console.log("-------------------- riot done --------------------")

                        // riot tag to ts
                        await exec('find ./tmp/script/ -name "*.js" | while read f; do mv "$f" "${f%.*}.ts"; done', true)
                        console.log("-------------------- riot tag to ts done --------------------")
                    })(),
                    (async () => {
                        // ts copy
                        await exec('rsync -a ./src/script/ ./tmp/script/ --exclude "/tag/"', true)
                        await exec('cp ./src/tsconfig.json ./tmp/tsconfig.json', true)
                        console.log("-------------------- ts copy done --------------------")
                    })()
                ])

                // ts
                await exec('npm run build-ts', true)
                console.log("-------------------- typescript done --------------------")

                // webpack
                try {
                    await exec('npm run webpack', true)
                    console.log("-------------------- webpack done --------------------")
                } catch(e) {}
            })(),
            (async () => {
                // sass
                try {
                    await exec('npm run build-sass', true)
                    console.log("-------------------- build sass done --------------------")
                } catch(e) {}
            })()
        ])

        // delete tmp
        await exec('dir=./tmp; [ -e $dir ] && rm -rf $dir', true)
        console.log("-------------------- delete tmp success --------------------")

        console.log("-------------------- build success --------------------")
    } catch(e) {
        console.error("-------------------- build failed --------------------")
        console.error(e)
    }
}
build()
