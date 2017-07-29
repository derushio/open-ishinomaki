common-header
    //TODO：URLを正規のものに変更
    a(href="/page/about.html" target="_self")
        img(src="/resource/image/logo.png").title
    .nav
        a(href="/page/search.html" target="_self") Search
        a(href="/page/search.html?tag=0" target="_self") 投稿
        a(href="https://www.google.co.jp" target="_self") 回覧板

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
