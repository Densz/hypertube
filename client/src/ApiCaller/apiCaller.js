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
		fetch('/api/userLogged', { credentials: 'same-origin' })
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
			rej(error);
		});
	});
};

const callApiUpload = (file, login) => {
	return new Promise((res, rej) => {
		console.log(file);
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