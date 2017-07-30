entry-item
    .item
        h2 {name}
        #img
        .desc {desc}
        a(href="{'/page/entry.html?id=' + id}")

    script.
        import $ from "jquery"
        import Base64 from "../../util/Base64"

        this.id = opts.id
        this.image = opts.image || "/resource/image/no_image.png"
        this.name = opts.name
        this.image = opts.image
        this.desc = opts.desc

        this.on("mount", () => {
            Base64.decodeToImage(this.image).then((img) => {
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
            position: relative

            a
                position: absolute
                top: 0
                left: 0
                right: 0
                bottom: 0
                cursor: pointer

        h2
            width: 100%
            font-size: 16px

        #img
            width: 100%
            
        #img img
            width: 100%
            height: auto

        desc
            width: 100%
