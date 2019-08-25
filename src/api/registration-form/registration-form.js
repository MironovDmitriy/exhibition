import apiWsRequest from '../apiWsRequest.js';

export const userRegistration = (photo, getResult) => {
	apiWsRequest(`wss://id.techteam.su/result`, photo, getResult);
};
