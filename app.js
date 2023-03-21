const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expenseRoute')
const sequelize = require('./utils/db');
//models
const User = require('./models/userModel')
const Expense = require('./models/expenseModel')
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/user', userRoute);
app.use('/expense',expenseRoute)
//RelationShips
User.hasMany(Expense);
Expense.belongsTo(User)




sequelize.sync()
    .then(() => {
    app.listen(4000);
    })
