post-entry
    .form
        input-form-item(title="タイトル" iid="title")
        input-form-pulldown(title="タグ" iid="tag" options="{tagOptions}")
        input-form-pulldown(title="地域" iid="regional" options="{regionalOptions}")
        input-form-pulldown(title="地域区分" iid="subRegional" options="{subRegionalOptions}")
        img#preview
        input-form-item(title="画像" iid="image" type="file")
        input-form-textarea(title="本文" iid="desc")

        button#sendButton(onClick="{onClick}") Post

    script.
        import $ from "jquery"
        // TODO: DBから取ってくる
        this.tagOptions = [
            { name: 'イベント', id: 1 },
            { name: '飲食店', id: 2 },
            { name: 'セール', id: 3 }
        ]
        this.regionalOptions = [
            { name: '山下', id: 1 },
            { name: '西山', id: 2 },
            { name: '田道町', id: 3 },
            { name: '中央', id: 4 }
        ]
        this.subRegionalOptions = [
            { name: '1丁目', id: 1 },
            { name: '2丁目', id: 2 }
        ]

        this.onClick = () => {
            const name = $(".form #title", this.root).val()
            console.log(name)
        }

        this.on("mount", () => {
            const fileinput = $("input-form-item #image", this.root)
            fileinput.change(() => {
                console.log("change")
                const files = fileinput.prop('files')
                const file = files[0]
                const fileRdr = new FileReader()
                const preview = $("img#preview", this.root)

                if (!files.length) {
                    preview.removeAttr("src")
                } else {
                    if (file.type.match('image.*')) {
                        fileRdr.onload = () => {
                            console.log("onload")
                            preview.attr('src', fileRdr.result)
                        }
                        fileRdr.readAsDataURL(file)
                    } else {
                        preview.removeAttr("src")
                    }
                }
            })
        })

    style(type="sass").
        @import "../../../style/color.sass"

        post-entry
            display: block

        img#preview
            width: 90%
            height: auto

        .form
            width: 600px
            margin: 32px auto
            padding: 16px
            background: $color-main-theme
            overflow: hidden

            button#sendButton
                float: right
                margin: 8px
                padding: 8px
                background: white
