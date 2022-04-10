const { MongoClient } = require("mongodb")
const { uri, database } = require('../modules/variable')

module.exports = {
    update: (req, res) => {
        MongoClient.connect(uri, async function (err, db) {
            var data = {
                commande: null,
                reponse: "ok",
                erreur: ""
            };
            if (err) {
                data.commande = null,
                    data.reponse = "not ok";
                data.erreur = err.message;
                res.send(JSON.stringify(data));
            } else {
                var dbo = db.db(database);
                var donnee = req.body;
                var id = donnee.id;
                var etat = donnee.etat;
                dbo.collection('commande').findOneAndUpdate({ _id: id }, { $set: { etat: etat } }, { upsert: true, returnOriginal: false },
                    function (err, result) {
                        var commande = result.value;
                        data.commande = commande;
                        data.reponse = "ok";
                        data.erreur = "";
                        res.send(JSON.stringify(data));
                        db.close();
                    });
            }
        });
    },

    findByResto: (req, res) => {
        MongoClient.connect(uri, function (err, db) {
            var data = {
                commandes: null,
                reponse: "ok",
                erreur: ""
            };
            if (err) {
                data.reponse = "not ok";
                data.erreur = err.message;
                res.send(JSON.stringify(data));
            } else {
                var dbo = db.db(database);
                var id = parseInt(req.params.id);
                console.log(id);
                dbo.collection("commande").find({ id_resto: id, etat: 0 }).sort({date:1}).toArray(function (err, result) {
                    if (err) {
                        data.reponse = "not ok";
                        data.erreur = err.message;
                    } else {
                        data.commandes = result;
                        data.reponse = "ok";
                        data.erreur = "";
                        res.send(JSON.stringify(data));
                        db.close();

                    }
                });
            }
        });
    },

    findByEtat: (req, res) => {
        MongoClient.connect(uri, function (err, db) {
            var data = {
                commandes: null,
                reponse: "ok",
                erreur: ""
            };
            if (err) {
                data.reponse = "not ok";
                data.erreur = err.message;
                res.send(JSON.stringify(data));
            } else {
                var dbo = db.db(database);
                var id = parseInt(req.params.id);
                console.log(id);
                var etat = parseInt(req.params.etat);
                dbo.collection("commande").find({ etat: etat }).sort({date:1}).toArray(function (err, result) {
                    if (err) {
                        data.reponse = "not ok";
                        data.erreur = err.message;
                    } else {
                        data.commandes = result;
                        data.reponse = "ok";
                        data.erreur = "";
                        res.send(JSON.stringify(data));
                        db.close();
                    }
                });
            }
        });
    }



}