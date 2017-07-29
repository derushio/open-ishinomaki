tagsearch
    h3 タグ
    .searchtag(each="{searchtag, i in searchtags}")
        input(type="checkbox" id="{'tagacc'+i}").acc-check
        input(type="checkbox" name="{'searchtag'+i}")
        label(for="{'tagacc'+i}") {searchtag}
        .acc-inner
            <input type="checkbox" id="test" />aiueo
    script.
        import $ from "jquery"
        this.searchtags = [
            "タグ１",
            "タグ２"
        ]

    style(type="sass").
        h3
            color: red

        .acc-check
            display: none

        .acc-inner
            display: none

        .acc-check:checked ~ .acc-inner
            display: block
