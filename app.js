const express = require('express')
const app = express()
const bodyParser=require("body-parser")
const cors=require("cors")


app.use(express.static("public"))
app.use(cors())
app.use(bodyParser.json())

// app.use(routes)

app.listen(4000)

