test
    h1 test
    
    script.
        import riot from "riot"
        import CommonError from "../define/Error"
        
        const str: string = "aiueo"
        console.log(CommonError)
        
    style.
        @import "color.sass"
        $h1-size: 64px
        h1
            color: $color-main-theme
            width: calc(?{$h1-size} + 16px)
