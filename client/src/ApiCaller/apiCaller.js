function callApi(url, method = 'get', params = undefined){
	let json = {
		method: method,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',	
		},
		body: (params ? JSON.stringify(params) : undefined)
	};
	fetch(url, json)
	.then((response) => {return response.json(); })
	.then((responseJson) => responseJson)
	.catch((error) => {
		console.error(error);
	});
}

export default callApi;