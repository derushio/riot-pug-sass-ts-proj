test
    h1 test
    
    script.
        const str: string = "aiueo"
        
    style.
        @import "color.sass"
        $h1-size: 64px
        h1
            color: $color-main-theme
            width: calc(?{$h1-size} + 16px)
