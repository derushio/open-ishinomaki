entry
    h1 {name}
    img.main-image(riot-src:image)
    .desc {desc}
    .position {position}
    google-map(latlng={latlng})

    script.
        import {pajax} from "../../util/PromisedAjax"

        this.name
        this.image
        this.desc
        this.position
        this.latlng

        this.on("mount", () => {
            pajax("get", "/api/getRegionalEntries", "", {
                id: window.args.id
            }).then((response) => {
                console.log(response)
            })
        })

    style(type="sass").
        entry
            display: block
