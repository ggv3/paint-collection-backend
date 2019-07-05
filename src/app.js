const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/database');

const PaintController = require('./controller/PaintController');

require('dotenv').config();
db.initDatabase();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Pass to next layer of middleware
	next();
});

app.use('/paints', PaintController);

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`));
