require('dotenv').config('../.env');
const { MongoClient } = require("mongodb");
const { sha1 } = require('../modules/function/fonction');
const { uri, database } = require('../modules/variable')

console.log(uri);

module.exports = {

    findLivreur:(req,res)=>{
        MongoClient.connect(uri, function (err, db) {
            var data = {
                users: null,
                reponse: "ok",
                erreur: ""
            };
            if (err) {
                data.reponse = "not ok";
                data.erreur = err.message;
                res.send(JSON.stringify(data));
            } else {
                var dbo = db.db(database);
                dbo.collection("utilisateur").find({types:3}, { projection: { mdp: 0 } }).toArray(function (err, result) {
                    if (err) {
                        data.reponse = "not ok";
                        data.erreur = err.message;
                    } else {
                        data.users = result;
                    }
                    res.send(JSON.stringify(data));
                    db.close();
                });
            }
        });
    },

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
                        if(result!=null){
                            data.user = {
                                id: result._id,
                                username: result.username,
                                mail: result.mail,
                                types: result.types
                            };
                        }else{
                            data.reponse = "not ok";
                            data.erreur = "verify your login";
                        }
                    }
                    res.send(JSON.stringify(data));
                    db.close();
                });
            }

        });
    },

    insert: (req, res) => {
        MongoClient.connect(uri, async function (err, db) {
            var data = {
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
                let id = -1;
                dbo.collection('counters').findOneAndUpdate({_id: "id_utilisateur"}, {$inc: {sequence_value: 1}},{upsert: true,returnOriginal: false}, 
                function (err, result) {
                        id = result.value.sequence_value;
                        var objet = {
                            _id: id,
                            username: donnee.username,
                            mail: donnee.mail,
                            mdp: sha1(donnee.mdp),
                            types: donnee.types
                        };
                        dbo.collection("utilisateur").insertOne(objet, function (err, result) {
                            if (err) {
                                data.reponse = "not ok";
                                data.erreur = err.message;
                            } else {
                                data.reponse = "ok";
                                data.erreur = "";
                            }
                            res.send(JSON.stringify(data));
                            db.close();
                        });
                    }
                );
            }
        });
    },

    update: (req, res) => {
        MongoClient.connect(uri, function (err, db) {
            var data = {
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
                var query = { _id: donnee.id };
                var newv = {
                    $set: {
                        username: donnee.username,
                        mail: donnee.mail,
                        mdp: md5(donnee.mdp),
                        types: donnee.types
                    }
                };
                dbo.collection("utilisateur").updateOne(query, newv, function (err, result) {
                    if (err) {
                        data.reponse = "not ok";
                        data.erreur = err.message;
                    } else {
                        data.reponse = "ok";
                        data.erreur = "";
                    }
                    res.send(JSON.stringify(data));
                    db.close();
                });
            }
        });

    },

    findAll: (req, res) => {
        MongoClient.connect(uri, function (err, db) {
            var data = {
                users: null,
                reponse: "ok",
                erreur: ""
            };
            if (err) {
                data.reponse = "not ok";
                data.erreur = err.message;
                res.send(JSON.stringify(data));
            } else {
                var dbo = db.db(database);
                dbo.collection("utilisateur").find({}, { projection: { mdp: 0 } }).toArray(function (err, result) {
                    if (err) {
                        data.reponse = "not ok";
                        data.erreur = err.message;
                    } else {
                        data.users = result;
                    }
                    res.send(JSON.stringify(data));
                    db.close();
                });
            }
        });
    }
}