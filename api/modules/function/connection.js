require('dotenv').config('../../..//.env.local');

const MongoClient = require('mongodb').MongoClient

var db = null;
const connectionString = process.env.connectionString;

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
})
    .then(client => {
        db=client.db('ekaly')
    }).catch((error => console.error(error)))

module.exports={db}
