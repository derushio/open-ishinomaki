entry-item
    img(riot-src="{image}")
    .desc {desc}

    script.
        this.image = opts.image || "/resource/image/no_image.png"
        this.desc = opts.desc

    style(type="sass").
        entry-item
            display: block
            padding: 8px
            border: 1px solid black

        img
            width: 100%
            height: auto
        desc
            width: 100%
