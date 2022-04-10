const { app } = require('./modules/app/app.module');
const UserRouter = require('./modules/router/user/user.router');
const RestoRouter=require('./modules/router/resto');
const CommandeRouter=require('./modules/router/commande-router');

async function main() {
  app.listen(process.env.PORT || 3000);
  UserRouter('/api', app)
  RestoRouter('/api',app)
  CommandeRouter('/api',app)
}

module.exports = { main, app };
