const { app } = require('./modules/app/app.module');
const UserRouter = require('./modules/router/user/user.router');

async function main() {
  app.listen(process.env.PORT || 3000);
  UserRouter('/api', app)
}

module.exports = { main, app };
