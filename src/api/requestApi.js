const requestApi = (ws, values) => {

	ws.onopen = () => console.log('Соединение установлено');

	ws.onclose = (e) => {
		if(e.wasClean) {
			console.log('Закрыто чисто');
		} else {
			console.log('Обрыв соединения');
		}
	console.log(`Код: ${e.code}; Причина: ${e.reason}`);
	};

	ws.onerror = (e) => console.log(e);

	const json = JSON.stringify(values);


	if (ws.readyState) {
		ws.send(json);
		console.log(json)
		console.log('данные отправлены')
	} else {
		alert('Websocket connection is not open')
	};
};

const getResponse = ws => {
	ws.onmessage = event => {
		const incomingMessage = event.data;
		return incomingMessage;
	};
};

export {
	requestApi,
	getResponse,
};