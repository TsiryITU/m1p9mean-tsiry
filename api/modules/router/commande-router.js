const {findByEtat,findByResto,update,getLivraison,insertLivraison,updateLivraison}=require('../../controller/commande-controller')

const CommandeRouter = (url, app) => {
    app.get(`${url}/resto/commande/find/:id`, findByResto)
    app.get(`${url}/commande/find/:etat`, findByEtat)
    app.post(`${url}/commande/update`, update)
    app.get(`${url}/livraison/:id`, getLivraison)
    app.post(`${url}/livraison/insertion`, insertLivraison)
    app.post(`${url}/livraison/update`, updateLivraison)
}

module.exports = CommandeRouter