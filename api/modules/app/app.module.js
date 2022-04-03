const express = require('express');
const cors = require('cors');
const app = express();

var dist='dist';

app.use('/public', express.static('public'));
app.use(express.static(dist));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var corsOptions = {
    origin: '*',
    methods: "*"
}
app.use(cors(corsOptions));

module.exports = { app };
