const express = require('express');
const Paint = require('../model/Paint');

const router = express.Router();

router.post('/addpaint', (req, res) => {
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

module.exports = router;
