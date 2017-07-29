tag-search
    h3 タグ
    .searchtag(each="{tag, i in eTags}")
        input(type="checkbox" id="{'tag'+i}")
        label(for="{'tag'+i}") {tag}

    script.
        import $ from "jquery"
        this.eTags = [
            "イベント",
            "飲食店",
            "セール"
        ]

    style(type="sass").
        tag-search
            display: block
