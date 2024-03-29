const express = require('express');
const myconnection = require('express-myconnection');
const mysql = require('mysql2');
const bodyParser = require('body-parser')
const loginRoutes = require('./routes/login');
const paypalRoutes = require('./routes/paypal');
const cors = require('cors');
const { PORT } = require('./config.js');
const { dbConfig } = require('./db.js');

const app = express();

app.use(cors({
	origin: '*'
}));

app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.set('port', PORT);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(myconnection(mysql, dbConfig, 'single'));

app.listen(app.get('port'), () => {
 console.log('listening on port ', app.get('port'));
});

app.use('/user', loginRoutes);
app.use('/paypal', paypalRoutes);

app.get('/', (req, res) => {
	res.status(200).send({status: true})
});
