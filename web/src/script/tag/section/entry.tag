entry
    h1 {(entry)?entry.name:null}
    #img
    .desc {(entry)?entry.text:null}
    google-map(latlng="{(entry)?entry.latlng:null}")

    script.
        import $ from "jquery"

        import {pajax} from "../../util/PromisedAjax"
        import Base64 from "../../util/Base64"

        this.entry

        this.on("mount", () => {
            pajax("get", "/api/getRegionalEntries?id=" +
                    window.args.id, null, null).then((response) => {
                console.log(response)
                this.entry = response.entries[0]
                this.update()
                return Base64.decodeToImage(this.entry.images[0])
            }).then((img) => {
                $('#img', this.root)[0].appendChild(img)
            })
        })

    style(type="sass").
        entry
            display: block

        img
            width: 400px
            height: auto
