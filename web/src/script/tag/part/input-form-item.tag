input-form-item
    label(for="{id}") {title}
    input(type="{type}" id="{name}" value="{def}")

    script.
        this.title = opts.title
        this.id = opts.id
        this.def = opts.def
        this.type = (opts.isPassword)? 'password' : 'text'

    style(type="sass").
        input-form-item
            display: flex
            align-items: center
            padding: 8px

        label
            display: block
            flex: 1

        input
            display: block
            flex: 1
            padding: 8px
            border: 1px solid black
