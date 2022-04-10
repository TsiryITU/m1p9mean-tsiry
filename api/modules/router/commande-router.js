const {findByEtat,findByResto,update}=require('../../controller/commande-controller')

const CommandeRouter = (url, app) => {
    app.get(`${url}/resto/commande/find/:id`, findByResto)
    app.get(`${url}/commande/find/:etat`, findByResto)
    app.post(`${url}/commande/update`, update)
   
}

module.exports = CommandeRouter