import apiHttpRequest from '../apiHttpRequest.js';
import apiWsRequest from '../apiWsRequest.js';

export const toCrm = async data => {
	const result = await apiHttpRequest(`https://facemo.ru/api/crm`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer Smfds432OAKSDMFds34asDFAda1234sASD',
		},
		json: {
			name: data.name,
			surname: data.surname,
		},
	});

	return result;
};

export const photoRecognition = async photo => {
	const result = await apiHttpRequest(`https://facemo.ru/api/emotion`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer Smfds432OAKSDMFds34asDFAda1234sASD',
		},
		json: {
			photo: photo,
		},
	});

	return result;

	// return {
	// 	age: 33,
	// 	emotion: "Нейтрально",
	// 	faceRectangle: {
	// 		height: 338,
	// 		left: 472,
	// 		top: 252,
	// 		width: 338,
	// 	},
	// 	gender: "Мужской",
	// 	glasses: "Нет",
	// 	hairColor: "brown",
	// 	makeup: "",
	// }
};

export const userRecognition = (photo, getResult) => {
	apiWsRequest(`wss://id.techteam.su/result`, photo, getResult);
};
