const axios = require('axios');

const callApi = (url, method = 'get', params = undefined) => {
	return new Promise((res, rej) => {
		let json = {
			method: method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',	
			},
			body: (params ? JSON.stringify(params) : undefined),
			credentials: 'same-origin'
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
		fetch('/api/user', { credentials: 'same-origin' })
		.then((response) => {
			res(response.json())
		})
		.catch((error) => {
			rej(error);
		});
	})
}

const logOut = () => {
	return new Promise((res, rej) => {
		fetch('/api/auth/signOut', { credentials: 'same-origin' })
		.then((response) => {
			res(response.json());
		})
		.catch((error) => {
			axios.get('/api/auth/signOut')
			.then((response) => { 
				// console.log(response)
				res(response.json());
			})
			.catch((error) => {
				console.log('axios logout');
				// console.log(error);
			})
		});
	});
};

const callApiUpload = (file, login) => {
	return new Promise((res, rej) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('login', login);
		let config = {
			method: 'post',
			body: formData,
		}
		fetch('/api/auth/updatePicture', config)
		.then((response) => {
			res(response.json());
		})
		.catch((err) => {
			rej(err);
		});
	});
}

module.exports = {
	callApi: callApi,
	isLogged: isLogged,
	logOut: logOut,
	callApiUpload: callApiUpload,
}