const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { db } = require('./database');
const { BACKEND_SERVER_PORT } = require('../src/constants');

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.headers.origin || req.headers.host);
	res.header('Access-Control-Allow-Headers', req.get('Access-Control-Request-Headers'));
	res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT');
	next();
});

// Requests endpoint
app.get('/api/requests', (req, res) => {
	const { count, cursor } = req.query;
	console.log(count, cursor);
	try {
		const data = db.get({ count, cursor });
		return res.json(data);
	} catch (err) {
		return res.status(500).end();
	}
});

// Archive request endpoint
app.patch('/api/requests/archive', (req, res) => {
	try {
		return res.json(db.archive(req.body.id));
	} catch (err) {
		return res.status(404).json({ error: err.message });
	}
});

app.listen(BACKEND_SERVER_PORT, () => console.log(`Backend listening on port ${BACKEND_SERVER_PORT}.`));
