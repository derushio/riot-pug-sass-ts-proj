test
    h1 { text }
    inner-test
    
    script.
        import riot from "riot"
        require("./inner-test")
        
        this.text = opts.text
        
        this.on("update", () => {
            console.log("test")
        })
        
    style.
        @import "color.sass"
        $h1-size: 64px
        h1
            color: $color-main-theme
            // calc内で変数を読むには?{}
            width: calc(?{$h1-size} + 16px)
