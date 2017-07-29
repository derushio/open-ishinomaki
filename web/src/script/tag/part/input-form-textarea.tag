input-form-textarea
    label(for="{iid}") {title}
    textarea(id="{iid}" value="{def}")

    script.
        this.title = opts.title
        this.iid = opts.iid
        this.def = opts.def

    style(type="sass").
        input-form-item
            display: block
            padding: 8px

        label
            display: block

        textarea
            resize: none
            width: 100%
            height: 10em
            display: block
            padding: 8px
            border: 1px solid black
