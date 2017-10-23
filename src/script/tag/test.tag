test
    h1 test
    test2
    
    script.
        import riot from "riot"
        import CommonError from "../define/Error"
        
        require("./test2"); riot.mount("test2") // この環境でtag in tagをするための仕組み
        
        const str: string = "aiueo"
        console.log(CommonError)
        
    style.
        @import "color.sass"
        $h1-size: 64px
        h1
            color: $color-main-theme
            // calc内で変数を読むには?{}
            width: calc(?{$h1-size} + 16px)
