const { update,findByUser,insertPlat,updatePlat,findPlats,findAll } = require('../../controller/resto-controller')

const RestoRouter = (url, app) => {
    app.post(`${url}/resto/update`, update)
    app.get(`${url}/resto/find/:id`, findByUser)
    app.post(`${url}/resto/plat/insert`, insertPlat)
    app.post(`${url}/resto/plat/update`, updatePlat)
    app.get(`${url}/resto/plat/findAll/:id`, findPlats)
    app.get(`${url}/resto/findAll`, findAll)

}

module.exports = RestoRouter