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
			if (response.status === 500) {
				return ;
			} else {
				res(response.json())
			}
		})
		.catch((error) => {
			rej(error);
		});
	})
}

const isLogged = () => {
	return new Promise((res, rej) => {
		fetch('/api/userLogged', { credentials: 'same-origin' })
		.then((response) => {
			res(response.json())
		})
		.catch((error) => {
			rej(error);
		});
	})
}

module.exports = {
	callApi: callApi,
	isLogged: isLogged
}