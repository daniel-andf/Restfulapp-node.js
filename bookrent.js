const Hapi = require('hapi')
const server = new Hapi.Server()
const Inert = require('inert')

server.register(Inert, function (err) {
        if (err) throw err;
  })

server.connection({
	host:'localhost',
	port:  Number(process.argv[2] || 8080)
})


server.route(require('./routes'))


server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`server is listening on: ${server.info.uri}`);
})