inner-test
    h1 { text }
    
    script.
        import riot from "riot"
        
        this.text = opts.text || ""
        
    style.
        @import "color.sass"
        
        $h1-margin: 64px
        h1
            color: $color-main-theme
            width: calc(100% - ?{$h1-margin} * 2)
            margin: $h1-margin
