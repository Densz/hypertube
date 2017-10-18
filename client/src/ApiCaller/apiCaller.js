function callApi(url, method = 'get', params = undefined){
	let json = {
		method: method
	}
	json.headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
	json.body = params ? JSON.stringify(params) : undefined;
	return fetch(url, json)
	.then((response) => console.log(response.json()))
	.then((responseJson) => responseJson)
	.catch((error) => {
		console.error(error);
	})
}

export default callApi;