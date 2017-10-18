const callApi = (url, method = 'get', params = undefined) => {
	let json = {
		method: method
	}
	json.headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
	params ? json.body = JSON.stringify(params) : ''
	return fetch(url, json)
	.then((response) => response.json())
	.then((responseJson) => responseJson)
	.catch((error) => {
		console.error(error);
	})
}

export default callApi;