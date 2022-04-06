const { app } = require('./modules/app/app.module');
const UserRouter = require('./modules/router/user/user.router');
const RestoRouter=require('./modules/router/resto');

async function main() {
  app.listen(process.env.PORT || 3000);
  UserRouter('/api', app)
  RestoRouter('/api',app)
}

module.exports = { main, app };
