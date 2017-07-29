post-entry
    form
        input-form-item(title="タイトル" id="title")
        input-form-pulldown(title="タグ" id="tag" options="{tagOptions}")
        input-form-item(title="画像" id="image" type="file")
        input-form-textarea(title="本文" id="desc")

    script.
        this.tagOptions = [
            { name: 'イベント', id: 1 },
            { name: '飲食店', id: 2 },
            { name: 'セール', id: 3 }
        ]

    style(type="sass").
        @import "../../../style/color.sass"

        post-entry
            display: block

        form
            width: 600px
            margin: 32px auto
            padding: 16px
            background: $color-main-theme
