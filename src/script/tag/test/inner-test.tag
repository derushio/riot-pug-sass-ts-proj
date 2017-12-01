inner-test
    h1 { text }

    script(type="top-ts").
        import riot from "riot"

    script.
        this.text = opts.text || ""

    style.
        @import "color.sass"

        $h1-margin: 64px
        h1
            color: $color-main-theme
            width: calc(100% - ?{$h1-margin} * 2)
            margin: $h1-margin
