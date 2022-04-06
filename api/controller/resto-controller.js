const { MongoClient } = require("mongodb")
const {uri,database}=require('../modules/variable')

module.exports={
    update:(req,res)=>{
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
    findByUser:(req,res)=>{
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
                        data.resto=null;
                        data.reponse = "not ok";
                        data.erreur = err.message;
                    } else {
                        data.resto = result;
                        data.reponse="ok";
                        data.erreur="";
                    }
                    res.send(JSON.stringify(data));
                    db.close();
                });
            }
        });
    }
}