post-entry
    input-form-item(title="タイトル" id="title")
    input-form-pulldown(title="タグ" id="tag" options="{tagOptions}")
    input-form-item(title="タイトル" id="title")

    script.
        this.tagOptions = [
            { name: 'イベント', id: 1 },
            { name: '飲食店', id: 2 },
            { name: 'セール', id: 3 }
        ]

    style(type="sass").
        post-entry
            display: block
