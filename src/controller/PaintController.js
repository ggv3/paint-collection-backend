const express = require('express');
const Paint = require('../model/Paint');

const router = express.Router();

require('dotenv').config();
const token = process.env.TOKEN;

const isTokenValid = reqToken => {
	return reqToken === token ? true : false;
};

router.post('/addpaint', (req, res) => {
	if (!isTokenValid(req.body.token)) {
		res.status(401).send('Invalid token');
	} else {
		try {
			Paint.findAll({ where: { name: req.body.name } }).then(paints => {
				if (paints.length > 0) {
					res.status(400).send('duplicate entry found');
				} else {
					Paint.create({
						name: req.body.name,
						amount: req.body.amount
					});
					res.status(200).send('Paint added succesfully');
				}
			});
		} catch (error) {
			console.log(error);
			res.status(500).send('Unexpected error');
		}
	}
});

router.get('/getpaints', (req, res) => {
	try {
		Paint.findAll().then(paints => {
			res.status(200).send(paints);
		});
	} catch (error) {
		console.log(e);
		res.status(500).send('Unexpected error');
	}
});

router.post('/updatepaint', (req, res) => {
	if (!isTokenValid(req.body.token)) {
		res.status(401).send('Invalid token');
	} else {
		try {
			Paint.findByPk(req.body.id).then(paint => {
				if (paint !== null) {
					paint.update({
						name: req.body.name,
						amount: req.body.amount
					});
					res.status(200).send('Paint updated succesfully');
				} else {
					res.status(404).send('Paint not found');
				}
			});
		} catch (error) {
			console.log(e);
			res.status(500).send('Unexpected error');
		}
	}
});

router.post('/deletepaint', (req, res) => {
	if (!isTokenValid(req.body.token)) {
		res.status(401).send('Invalid token');
	} else {
		try {
			Paint.findByPk(req.body.id).then(paint => {
				if (paint !== null) {
					paint.destroy();
					res.status(200).send('Paint deleted succesfully');
				} else {
					res.status(404).send('Paint not found');
				}
			});
		} catch (error) {
			console.log(e);
			res.status(500).send('Unexpected error');
		}
	}
});

module.exports = router;
