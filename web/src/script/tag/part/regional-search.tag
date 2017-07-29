regional-search
    h3 地域
    .regional(each="{regional, i in regionals}")
        input(type="checkbox" id="{'regional'+i}").acc-check
        label(for="{'regional'+i}") {regional.name}
        .acc-inner
            .sub-regional(each="{sub_regional, j in regional.sub_regionals}")
                input(type="checkbox" id="{'sub_regional'+i+'-'+j}")
                label(for="{'sub_regional'+i+'-'+j}") {sub_regional.name}

    script.
        import $ from "jquery"
        this.regionals = [
            { name: "中央", sub_regionals: [
                { name: "1丁目" },
                { name: "2丁目" }
            ]},
            { name: "田道町", sub_regionals: [
                { name: "1丁目" },
                { name: "2丁目" }
            ]},
            { name: "山下", sub_regionals: [
                { name: "1丁目" },
                { name: "2丁目" }
            ]},
        ]

        $(function() {
            $('#test').change(function() {
                let val = $(this).val()
                $('p').text(val)
            })
        })

    style(type="sass").
        regional-search
            display: block

        .acc-inner
            display: none

        .acc-check:checked ~ .acc-inner
            display: block

        .sub-regional
            margin: 0 0 0 16px
