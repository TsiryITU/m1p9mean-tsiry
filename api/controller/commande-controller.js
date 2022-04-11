const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require("constants");
const { MongoClient } = require("mongodb")
const { uri, database } = require('../modules/variable')

module.exports = {

    updateLivraison:(req,res)=>{
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
                var query = { "_id":donnee.id,"commandes.id_commande":id_commande };
                var newv = {
                    $set: {
                        "commandes.etat":1
                    }
                };
                dbo.collection("livraison").updateOne(query, newv, function (err, result) {
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

    getLivraison: (req, res) => {
        MongoClient.connect(uri, async function (err, db) {
            var data = {
                livraisons: null,
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
                dbo.collection("livraison").aggregate([{
                    $project: {
                        _id: 1, id_utilisateur: 1, date: 1, commandes: {
                            $filter: {
                                input: "$commandes",
                                as: "commande",
                                cond: {
                                    $eq: ["$$commande.etat", 0]
                                }
                            }
                        }
                    }
                }]).toArray(function (err, result) {
                    if (err) {
                        data.reponse = "not ok";
                        data.erreur = err.message;
                    } else {
                        data.livraisons = [];
                        result.forEach(e => {
                            if (e.id_utilisateur==id && e.commandes.length > 0) {
                                data.livraisons.push(e);
                            }
                        });
                    }
                    res.send(JSON.stringify(data));
                    db.close();
                });
            }
        });
    },

    insertLivraison: (req, res) => {
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
                console.log(donnee);
                dbo.collection('counters').findOneAndUpdate({ _id: "id_livraison" }, { $inc: { sequence_value: 1 } }, { upsert: true, returnOriginal: false },
                    function (err, result) {
                        id = result.value.sequence_value;
                        var objet = {
                            _id: id,
                            id_utilisateur: donnee.id_utilisateur,
                            "date": new Date(Date.now()),
                            commandes: donnee.commandes
                        };
                        dbo.collection("livraison").insertOne(objet, function (err, result) {
                            if (err) {
                                data.reponse = "not ok";
                                data.erreur = err.message;
                            } else {
                                var condition = [];
                                donnee.commandes.forEach(c => {
                                    let cond = {
                                        _id: parseInt(c.id_commande)
                                    };
                                    condition.push(cond);
                                });
                                dbo.collection("commande").updateMany({ $or: condition }, { $set: { "etat": 2 } }, function (err, result) {
                                    if (err) {
                                        data.reponse = "not ok";
                                        data.erreur = err.message;
                                        console.log(err);
                                    } else {
                                        console.log(result);
                                        data.reponse = "ok";
                                        data.erreur = "";
                                        res.send(JSON.stringify(data));
                                        db.close();
                                    }
                                });
                            }
                        });
                    });
            }
        });
    },

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
                dbo.collection("commande").find({ id_resto: id, etat: 0 }).sort({ date: 1 }).toArray(function (err, result) {
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
                dbo.collection("commande").find({ etat: etat }).sort({ date: 1 }).toArray(function (err, result) {
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