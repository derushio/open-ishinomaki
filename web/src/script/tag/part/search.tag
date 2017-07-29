search
    input(type="text" placeholder="キーワード")
    button(type="submit")
        img(src="/resource/image/scope.png")

    style(type="sass").
        search
            display: flex
            *
                display: block

        button
            background-color: #BBB
            width: 64px
            height: 100%
            border-radius: 6px
            margin: 0 0 0 8px
            position: relative

            img
                width: auto
                height: 90%
                position: absolute
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)

        input
            border: 1px solid black
            padding: 8px
            border-radius: 6px
            flex: 1
            height: 100%

        button:hover
            background: #67c5ff
            color: white
