about-img
  img(src="art_2.jpg")
  .concept
    h3 コンセプト
    p 石巻の情報を効率よく、楽しく収集したい。

  style(type="sass").
    about-img
      display: flex
      align-items: flex-start
      width: 100%
      height: 128px

    img
      display: block
      height: auto
      width: 100%
      flex: 1
      margin: 16px

    .concept
      flex: 1
      margin: 16px
