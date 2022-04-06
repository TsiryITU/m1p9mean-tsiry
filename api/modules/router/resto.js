const { update,findByUser } = require('../../controller/resto-controller')

const RestoRouter = (url, app) => {
    app.post(`${url}/resto/update`, update)
    app.get(`${url}/resto/find/:id`, findByUser)
}

module.exports = RestoRouter