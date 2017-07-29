entry-item
    .item
        h2 {name}
        #img
        .desc {desc}

    script.
        import $ from "jquery"

        this.image = opts.image || "/resource/image/no_image.png"
        this.name = opts.name
        this.image = opts.image
        this.desc = opts.desc

        function Base64ToImage(base64img, callback) {
            var img = new Image()
            img.onload = () => {
                callback(img)
            }
            img.src = base64img
        }

        this.on("mount", () => {
            Base64ToImage(this.image, (img) => {
                $('#img', this.root)[0].appendChild(img)
            })
        })

    style(type="sass").
        entry-item
            display: block
            padding: 8px

        .item
            border: 1px solid black
            padding: 8px

        h2
            width: 100%
            font-size: 16px

        img
            width: 100%
            height: auto

        desc
            width: 100%
