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
	} else {
		alert('Websocket connection is not open')
	};
};

const getResponse = (ws, getResult) => {
	ws.onmessage = event => {
		const incomingMessage = JSON.parse(event.data);
		getResult(incomingMessage);
	};
};

export {
	requestApi,
	getResponse,
};