inner-test
    h1 test2
    
    script.
        import riot from "riot"
        
    style.
        @import "color.sass"
        $h1-size: 64px
        h1
            color: $color-main-theme
            width: calc(?{$h1-size} + 16px)
