require('dotenv').config('../.env');
const { MongoClient } = require("mongodb")

const uri = "mongodb+srv://root:root@cluster0.zeny8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
console.log(uri);
const database = "ekaly";
const client = new MongoClient(uri);

const users = [
    { _id: 0, username: 'Test' },
    { _id: 1, username: 'Test 2' },
    { _id: 2, username: 'Test 3' }
]

module.exports = {
    login: (req, res) => {
        MongoClient.connect(uri, function (err, db) {
            var data = {
                user: null,
                reponse: "ok",
                erreur: ""
            };
            if (err) {
                data.reponse = "not ok";
                data.erreur = err.message;
                res.send(JSON.stringify(data));
            } else {
                var dbo = db.db(database);
                var donnee = req.body;
                dbo.collection("utilisateur").findOne({ mail: donnee.mail, mdp: donnee.mdp }, function (err, result) {
                    if (err) {
                        data.reponse = "not ok";
                        data.erreur = err.message;
                    } else {
                        data.user = {
                            id:result._id,
                            username: result.username,
                            mail:result.mail,
                            types:result.types
                        };
                    }
                    res.send(JSON.stringify(data));
                    db.close();
                });
            }

        });
    },
    findAll: (req, res) => res.json(users)
}