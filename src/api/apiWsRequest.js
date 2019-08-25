export default (url, data, getResult) => {
	const websocket = new WebSocket(url);

	websocket.onopen = () => {
		const json = JSON.stringify(data);

		if (websocket.readyState) {
			websocket.send(json);
		} else {
			alert('Websocket connection is not open')
		};
	};

	websocket.onclose = (e) => {
		if(e.wasClean) {
			console.log('Закрыто чисто');
		} else {
			console.log('Обрыв соединения');
		}
	console.log(`Код: ${e.code}; Причина: ${e.reason}`);
	};

	websocket.onerror = (e) => console.log(e);

	websocket.onmessage = (e) => {
		const incomingMessage = JSON.parse(e.data);
		getResult(incomingMessage);
	};
};
