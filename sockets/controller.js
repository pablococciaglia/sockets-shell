const socketController = (client) => {
	console.log('client Connected', client.id);

	client.on('disconnect', () => {
		console.log('Client disconnected', client.id);
	});

	client.on('client-server-message', (payload, callback) => {
		const id = { messageId: 123456, date: new Date().getTime() };
		callback(id);
		client.broadcast.emit('server-client-message', payload); // on this case the server emit a message to all the clients
	});
};

module.exports = {
	socketController,
};
