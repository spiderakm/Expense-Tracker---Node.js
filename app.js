const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const userRoutes = require('./routes/user');
const expenseRoute = require('./routes/expense')
const sequelize = require('./models/userModel');

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/user', userRoutes);
app.use('/expense',expenseRoute)

sequelize.sync();

app.listen(4000);