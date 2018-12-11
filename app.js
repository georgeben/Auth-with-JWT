const express = require('express');
const bps = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

mongoose.connect('mongodb://localhost/test-users', {
    useNewUrlParser: true,
})

const db = mongoose.connection;

db.on('connected', () => console.log('Successfully connected to db'));
db.on('error', () => console.log('Failed to connect to db'));

const api = require('./api/api');

const app = express();

app.use(logger('dev'));
app.use(cors());

app.use(bps.urlencoded({extended: false}));
app.use(bps.json());

app.use('/api/v1', api);

app.get('/', (req, res) => {
    res.send('Welcome to the API. Read the docs to get started');
})

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Page not found',
    });
})

app.use((err, req, res, next) => {
    res.status(500).json({
        message:err.message
    })
});

const server = app.listen(3000, () => console.log(`App started on port ${server.address().port}`))