regional-search
    h3 地域
    .regional(each="{regional, i in regionals}")
        input(type="checkbox" id="{'regionacc'+i}").acc-check
        input(type="checkbox" name="{'regional'+i}")
        label(for="{'regionacc'+i}") {regional}
        .acc-inner
            input(type="checkbox" id="test") test
    script.
        import $ from "jquery"
        this.regionals = [
            "中央",
            "田道町"
        ]
        $(function() {
            $('#test').change(function() {
                var val = $(this).val();
                $('p').text(val);
            });
        });

    style(type="sass").
        regional-search
            display: block

        h3
            color: red

        .acc-check
            display: none

        .acc-inner
            display: none

        .acc-check:checked ~ .acc-inner
            display: block
