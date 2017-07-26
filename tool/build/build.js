/**
 * ビルドスクリプト
 */

const fs = require('fs')
const child_process = require('child_process')
const exec = (command, display) => {
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

// クリーンビルド
exec('rm -rf ./dist/').then(() => {
    // リソースコピー
    return exec('rsync -a ./src/ ./dist/ --exclude "/script/" --exclude "/style/" --exclude "*.pug"', true).then(() => {
        console.log("-------------------- resource copy done --------------------")
    })
}).then(() => {
    // ts
    return exec('npm run build-ts', true).then(() => {
        console.log("-------------------- typescript done --------------------")
    })
}).then(() => {
    // webpack
    return exec('npm run webpack', true).then(() => {
        console.log("-------------------- webpack done --------------------")
    }).catch((stderr) => {
        // loader warning
    })
}).then(() => {
    // pug
    return exec('npm run build-pug', true).then(() => {
        console.log("-------------------- build pug done --------------------")
    })
}).then(() => {
    // sass
    return exec('npm run build-sass', true).then(() => {
        console.log("-------------------- build sass done --------------------")
    }).catch((stderr) => {
        // sass warning
    })
}).then(() => {
    return exec('rm -rf src/script-es6')
}).then(() => {
    console.log("-------------------- build success --------------------")
    return
}).catch((e) => {
    console.error("-------------------- build failed --------------------")
    console.error(e)
    return
})
