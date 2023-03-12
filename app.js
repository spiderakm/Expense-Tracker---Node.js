const express = require('express')
const app = express()
const bodyParser=require("body-parser")
const sequelize = require('./models/userModel')
const cors=require("cors")
const Userroutes = require('./routes/user')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static('public'))


app.use('/user',Userroutes)

sequelize.sync().then(() => {
    app.listen(4000)
})

