const express = require('express');
const app = express();
const db = require('./db/database');
require('dotenv').config();

db.initDatabase();

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}!`));
