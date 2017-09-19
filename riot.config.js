const sass = require("node-sass")

export default {
    from: 'src/script/tag',
    to: 'src/script-ts/tag',
    ext: 'tag',
    template: 'pug',
    type: 'ts2',
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
        js: {
            ts2: (js, opts, url) => {
                return js
            }
        },
    }
}
