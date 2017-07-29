common-header
    //TODO：URLを正規のものに変更
    a(href="https://www.google.co.jp" target="blank")
        img(src="/Users/K.TANIDA/Documents/work/open-ishinomaki/web/src/resource/image/logo.png" width="300" height="50")
        //TODO:画像のパスが絶対パスになっているので相対パスに変更する必要あり？
    a(href="https://www.google.co.jp" target="blank") Search
    a(href="https://www.google.co.jp" target="blank") 回覧板
    a(href="https://www.google.co.jp" target="blank") Culture
    a(href="https://www.google.co.jp" target="blank") Food
    a(href="https://www.google.co.jp" target="blank") Event

    style(type="sass").
        common-header
            display: flex
            align-items: baseline
        a
            display: block
            margin: 0 16px
