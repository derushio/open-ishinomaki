common-header
    //TODO：URLを正規のものに変更
    a(href="/page/about.html" target="_self")
        img(src="/resource/image/logo.png").title
    .nav
        a(href="/page/search.html" target="_self") Search
        a(href="/page/post-entry.html" target="_self") 投稿
        a(href="/page/kairan-ban.html" target="_self") 回覧板
        a(href="#" target="_self") API仕様

    style(type="sass").
        common-header
            display: flex
            align-items: center
            width: 100%

        .nav
            display: flex

        img.title
            width: 300px
            height: auto

        a
            display: block
            margin: 0 16px
