const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const socket = io();
socket.on('connect', () => {
	lblOffline.style.display = 'none';
	lblOnline.style.display = '';
});
socket.on('disconnect', () => {
	lblOnline.style.display = 'none';
	lblOffline.style.display = '';
});
socket.on('server-client-message', (payload) => {
	console.log(payload);
});

btnSend.addEventListener('click', () => {
	const payload = {
		msg: txtMessage.value,
		id: '12345qwe',
		date: new Date().getTime(),
	};

	socket.emit('client-server-message', payload, (id) => {
		console.log('Message id that regurn from the server', id);
	});
});
