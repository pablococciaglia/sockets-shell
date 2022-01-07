const express = require('express');
let cors = require('cors');
const { socketController } = require('../sockets/controller');
// const { dbCNN } = require('../database/config');

class Server {
	constructor() {
		this.app = express();
		this.server = require('http').createServer(this.app);
		this.io = require('socket.io')(this.server);

		this.port = process.env.PORT;

		this.paths = {};

		// Middlewares
		this.middlewares();

		// Routes of my app
		this.routes();

		// Sockets
		this.sockets();
	}

	async dbConnection() {
		await dbCNN();
	}

	middlewares() {
		// Public directory
		this.app.use(express.static('public'));

		// Parse and body reader
		// this.app.use(express.json());

		// CORS
		this.app.use(cors());
	}

	routes() {
		// this.app.use(this.paths.auth, require('../routes/auth.routes'));
	}

	listen() {
		this.server.listen(this.port, () => {
			console.log('Server in port,', this.port);
		});
	}

	sockets() {
		this.io.on('connection', socketController);
	}
}
module.exports = Server;
