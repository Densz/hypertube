const callApi = (url, method = 'get', params = undefined) => {
	return new Promise((res, rej) => {
		let json = {
			method: method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',	
			},
			body: (params ? JSON.stringify(params) : undefined)
		};
		fetch(url, json)
		.then((response) => {
			res(response.json())
		})
		.catch((error) => {
			rej(error);
		});
	})
}

export default callApi;