search-results
    entry-item(each="{entry in entries}" image="{(entry.images)?entry.images[0]:null}", desc="{entry.text}")

    script.
        import $ from "jquery"
        import {pajax} from "../../util/PromisedAjax"

        this.args = window.args
        this.entries = []

        this.on("mount", () => {
            pajax("get", "/api/getRegionalEntries", null, {

            }).then((response) => {
                console.log(response)
                // TODO base64 変換

                this.entries = response.entries
                this.update()
            })
        })

    style(type="sass").
        search-results
            display: flex
