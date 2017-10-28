test
    h1 { text }
    inner-test(text="{ innerText }")
    
    script.
        import riot from "riot"
        require("./inner-test")
        
        // optsからurlのパラメータを受け取り
        // textを取り出す
        this.urlParams = opts.urlParams
        this.text = this.urlParams["text"]
        this.innerText = this.urlParams["innerText"]
        
    style.
        // importの基底Dirは `/style/`
        @import "color.sass"
        
        $h1-size: 64px
        h1
            color: $color-main-theme
            // calc内で変数を読むには `?{}`
            width: calc(?{$h1-size} + 16px)
