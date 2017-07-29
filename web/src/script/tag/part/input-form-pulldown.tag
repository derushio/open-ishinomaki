input-form-pulldown
    label(for="{iid}") {title}
    select(name="{iid}")
        option(each="{option in options}" value="{option.id}") {option.name}

    script.
        this.title = opts.title
        this.iid = opts.iid
        this.options = opts.options

    style(type="sass").
        input-form-pulldown
            display: flex
            align-items: center
            padding: 8px
        label
            display: block
            flex: 1

        select
            display: block
            flex: 1
            height: 2em
            padding: 8px
