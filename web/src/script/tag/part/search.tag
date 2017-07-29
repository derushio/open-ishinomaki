search
    input(type="text" placeholder="Search...")
    button(type="submit") GO

    style(type="sass").
        search
            display: flex
            & > *
                display: block

        button
            background-color: #BBB
            width: 64px
            height: 100%
            border-radius: 6px

        input
            border: 1px solid black
            padding: 8px
            border-radius: 6px
            flex: 1
            height: 100%

        button:hover
            background: #67c5ff
            color: white
