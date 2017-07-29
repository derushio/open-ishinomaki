post-entry
    form
        input-form-item(title="タイトル" id="title")
        input-form-pulldown(title="タグ" id="tag" options="{tagOptions}")
        img#preview
        input-form-item(title="画像" id="image" type="file")
        input-form-textarea(title="本文" id="desc")

    script.
        import $ from "jquery"
        this.tagOptions = [
            { name: 'イベント', id: 1 },
            { name: '飲食店', id: 2 },
            { name: 'セール', id: 3 }
        ]

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

        form
            width: 600px
            margin: 32px auto
            padding: 16px
            background: $color-main-theme
