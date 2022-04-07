const { update,findByUser,insertPlat,updatePlat } = require('../../controller/resto-controller')

const RestoRouter = (url, app) => {
    app.post(`${url}/resto/update`, update)
    app.get(`${url}/resto/find/:id`, findByUser)
    app.post(`${url}/resto/plat/insert`, insertPlat)
    app.post(`${url}/resto/plat/update`, updatePlat)

}

module.exports = RestoRouter