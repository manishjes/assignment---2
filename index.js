const http = require('http');
const app = require('./server')
const port = process.env.PORT||8080

const sever = http.createServer(app)

sever.listen(port)