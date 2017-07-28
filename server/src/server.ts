export declare function require(name: string): any
const bodyParser = require('body-parser')
const express = require('express')
const server = express()

import createTables from "./logic/initData/createTables"
import createInitData from "./logic/initData/createInitData"
import registRestApis from "./logic/restApi/registRestApis"

createTables().then(() => {
    return createInitData()
}).then(() => {
    const port = 8000

    server.use(bodyParser.json({extended: true}))
    server.use(express.static("../web/"))
    // このディレクトリ以下を公開するサーバーを起動
    server.use(express.static("./"))
    server.listen(port, null)


    registRestApis(server)
})
