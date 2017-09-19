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
        await exec('dir=./dist; [ -e $dir ] && rm -rf $dir; mkdir $dir')
        await exec('dir=./tmp; [ -e $dir ] && rm -rf $dir; mkdir $dir')
        await exec('dir=./tmp/script-ts; [ -e $dir ] && rm -rf $dir; mkdir $dir')
        await exec('dir=./tmp/script-es5; [ -e $dir ] && rm -rf $dir; mkdir $dir')

        await Promise.all([
            (async () => {
                // リソースコピー
                await exec('rsync -a ./src/ ./dist/ --exclude "/script/" --exclude "/style/" --exclude "*.pug"', true)
                console.log("-------------------- resource copy done --------------------")
            })(),
            (async () => {
                // pug
                await exec('npm run build-pug')
                console.log("-------------------- build pug done --------------------")
            })(),
            (async () => {
                // script
                await Promise.all([
                    (async () => {
                        // riot
                        await exec('npm run build-riot')
                        console.log("-------------------- riot done --------------------")

                        // riot tag to ts
                        await exec('find ./tmp/script-ts/ -name "*.js" | while read f; do mv "$f" "${f%.*}.ts"; done')
                        console.log("-------------------- riot tag to ts done --------------------")
                    })(),
                    (async () => {
                        // ts copy
                        await exec('rsync -a ./src/script/ ./tmp/script-ts/ --exclude "/tag/"')
                        await exec('cp ./src/tsconfig.json ./tmp/tsconfig.json')
                        console.log("-------------------- ts copy done --------------------")
                    })()
                ])

                // ts
                await exec('npm run build-ts')
                console.log("-------------------- typescript done --------------------")

                // webpack
                try {
                    await exec('npm run webpack')
                    console.log("-------------------- webpack done --------------------")
                } catch(e) {}
            })(),
            (async () => {
                // sass
                try {
                    await exec('npm run build-sass')
                    console.log("-------------------- build sass done --------------------")
                } catch(e) {}
            })()
        ])

        // delete tmp
        await exec('dir=./tmp; [ -e $dir ] && rm -rf $dir')
        console.log("-------------------- delete tmp success --------------------")

        console.log("-------------------- build success --------------------")
    } catch(e) {
        console.error("-------------------- build failed --------------------")
        console.error(e)
    }
}
build()
