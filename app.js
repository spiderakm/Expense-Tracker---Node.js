const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expenseRoute')
const sequelize = require('./utils/db');

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/user', userRoute);
app.use('/expense',expenseRoute)

sequelize.sync();

app.listen(4000);