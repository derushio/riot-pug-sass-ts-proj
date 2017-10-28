inner-test
    h1 { text }
    
    script.
        import riot from "riot"
        
        this.text = opts.text
        
    style.
        @import "color.sass"
        
        $h1-size: 64px
        h1
            color: $color-main-theme
            width: calc(?{$h1-size} + 16px)
