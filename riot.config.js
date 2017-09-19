const sass = require("node-sass")

export default {
    from: 'src/script/tag',
    to: 'src/script-es5/tag',
    ext: 'tag',
    template: 'pug',
    style: 'sass2',
    parsers: {
        css: {
            sass2: (tagName, css, opts, url) => {
                const sassData = css.replace(/\?{(.*)?}/g, "#{$1}").replace(/(^|\n) {4,4}/g, "$1")
                const css2 = sass.renderSync({
                    data: sassData,
                    indentedSyntax: true,
                    includePaths: ["./src/style"]
                })
                return css2.css.toString('utf-8')
            }
        },
        "js.ts": (js, opts, url) => {
            console.log(js)
        },
    }
}
