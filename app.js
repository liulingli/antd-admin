const path = require('path')
const express = require('express');

const app = express();
const indexPath = path.join(__dirname, 'index.html');
const publicPath = express.static(path.join(__dirname, 'static'));

const port = (process.env.PORT || 8088)

app.get('/', function (_, res) { res.sendFile(indexPath) });

app.listen(port);
console.log(`Listening at http://localhost:${port}`)