entry-item
    .item
        h2 {name}
        img(riot-src="{image}")
        .desc {desc}

    script.
        this.image = opts.image || "/resource/image/no_image.png"
        this.name = opts.name
        this.desc = opts.desc

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
