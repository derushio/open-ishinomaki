entry-item
    img(riot-src="{image}")
    .desc {desc}

    script.
        this.image = opts.image
        this.desc = opts.desc

    style(type="sass").
    entry-item
        display: block

    img
        width: 100%
        height: auto
    desc
        width: 100%
