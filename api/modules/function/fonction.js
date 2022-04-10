const crypto = require("crypto");

function sha1(data) {
    return crypto.createHash("sha1").update(data, "binary").digest("hex");
}

// function connecter(){
//     return new Promise(function(resolve,reject){
//         MongoClient.connect(uri, function (err, db) {
//             if (err) {
//                 resolve(err);
//             } else {
//                 var dbo = db.db(database);
//                 resolve(dbo);
//             }
//         });
//     });

// }

module.exports={sha1}