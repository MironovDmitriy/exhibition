import apiHttpRequest from '../apiHttpRequest.js';
import apiWsRequest from '../apiWsRequest.js';

export const photoRecognition = async photo => {
	const result = await apiHttpRequest(`https://facemo.ru/api/image`, {
		method: 'POST',
		// headers: {
		// 	Authorization: 'Bearer Smfds432OAKSDMFds34asDFAda1234sASD',
		// },
		json: {
			photo: photo,
		},
	});
	console.log(result);
	return result;
};

export const userRecognition = (photo, getResult) => {
	apiWsRequest(`wss://id.techteam.su/result`, photo, getResult);
};
