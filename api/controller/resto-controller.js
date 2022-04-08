const { MongoClient } = require("mongodb")
const { uri, database } = require('../modules/variable')

module.exports = {

    findPlats: (req, res) => {
        MongoClient.connect(uri, function (err, db) {
            var data = {
                plats: null,
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
                // dbo.collection("restaurant").find({"plats.dispo":1},  { plats: 1 } ).toArray(function (err, result) {
                dbo.collection("restaurant").findOne({ _id: id }, function (err, result) {
                    if (err) {
                        data.reponse = "not ok";
                        data.erreur = err.message;
                    } else {
                        if (result != null) {
                            console.log(result);
                            // restos=result.plats;
                            data.plats = result.plats;
                            data.reponse = "ok";
                            data.erreur = "";
                        }
                        res.send(JSON.stringify(data));
                        db.close();

                    }
                });
            }
        });
    },

    findAll: (req, res) => {
        MongoClient.connect(uri, function (err, db) {
            var data = {
                plats: null,
                reponse: "ok",
                erreur: ""
            };
            if (err) {
                data.reponse = "not ok";
                data.erreur = err.message;
                res.send(JSON.stringify(data));
            } else {
                var dbo = db.db(database);
                dbo.collection("restaurant").find({}, { projection: { plats: 0 } }).toArray(function (err, result) {
                    if (err) {
                        data.reponse = "not ok";
                        data.erreur = err.message;
                    } else {
                        data.restos = result;
                    }
                    res.send(JSON.stringify(data));
                    db.close();
                });
            }
        });
    },
    updatePlat: (req, res) => {
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
                var query = { _id: donnee.id_restaurant };
                var newv = {
                    $set: {
                        [`plats.${donnee.id_plat}.nom`]: donnee.nom,
                        [`plats.${donnee.id_plat}.desc`]: donnee.desc,
                        [`plats.${donnee.id_plat}.photo`]: donnee.photo,
                        [`plats.${donnee.id_plat}.prixA`]: parseDouble(donnee.prixA),
                        [`plats.${donnee.id_plat}.prixV`]: parseDouble(donnee.prixV),
                        [`plats.${donnee.id_plat}.dispo`]: parseInt(donnee.dispo)
                    }
                };
                dbo.collection("restaurant").updateOne(query, newv, function (err, result) {
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

    insertPlat: (req, res) => {
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
                var query = { _id: donnee.id_restaurant };
                var newv = {
                    $push: {
                        plats: {
                            nom: donnee.nom,
                            desc: donnee.desc,
                            photo: donnee.photo,
                            prixA: parseDouble(donnee.prixA),
                            prixV: parseDouble(donnee.prixV),
                            dispo: parseInt(donnee.dispo)
                        }

                    }
                };
                dbo.collection("restaurant").updateOne(query, newv, function (err, result) {
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
                        nom: donnee.nom,
                        lieu: donnee.lieu
                    }
                };
                dbo.collection("restaurant").updateOne(query, newv, function (err, result) {
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
    findByUser: (req, res) => {
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
                var id = parseInt(req.params.id);
                dbo.collection("restaurant").findOne({ id_utilisateur: id }, function (err, result) {
                    if (err) {
                        data.resto = null;
                        data.reponse = "not ok";
                        data.erreur = err.message;
                    } else {
                        data.resto = result;
                        data.reponse = "ok";
                        data.erreur = "";
                    }
                    res.send(JSON.stringify(data));
                    db.close();
                });
            }
        });
    }
}