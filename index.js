const { main, app } = require('./api/main');
const path = require('path');
var dist='dist/index.html';

app.get('/app/*', (req, res) => res.sendFile(path.join(__dirname, dist)));
app.get('/app/', (req, res) => res.sendFile(path.join(__dirname, dist)));
main();
