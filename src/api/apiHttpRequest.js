import fetch from 'isomorphic-fetch';

	const defaultOptions = {
		credentials: 'include',
		returnType: 'json',
	};

export default async (endpoint, addOptions = {}) => {
	const options = {
		...defaultOptions,
		...addOptions,
	};

	if (!options.headers) {
		options.headers = {}
	};

	let url = `${endpoint}`;

	if (options.qs) {
		const query = Object.keys(options.qs)
			.map(k => `${encodeURIComponent(k)}=${encodeURIComponent(options.qs[k])}`)
			.join('&');
		url += `?${query}`;
	};

	if (addOptions.json && typeof addOptions.json === 'object') {
		options.body = JSON.stringify(addOptions.json);
		delete options.json;

		options.headers['Content-Type']= 'application/json'
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();

		return data;
	} catch (err) {
		throw new Error(err);
	};
};