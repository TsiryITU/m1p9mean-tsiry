const { login,insert,update, findAll,findLivreur } = require('../../../controller/user.controller')

const UserRouter = (url, app) => {
    app.get(`${url}/all`, findAll)
    app.post(`${url}/user/login`, login)
    app.post(`${url}/user/insert`, insert)
    app.post(`${url}/user/update`, update)
    app.get(`${url}/user/findAll`, findAll)
    app.get(`${url}/user/find/livreur`, findLivreur)
}

module.exports = UserRouter