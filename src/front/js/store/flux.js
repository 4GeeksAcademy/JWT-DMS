const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: sessionStorage.getItem('token'),
			user: null
		},
		actions: {
			// Use getActions to call a function within a function
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			},
			signUp: async (email, password) => {
				try {
					const req = await fetch('https://psychic-trout-v6v567rrxwv9hwxg4-3001.app.github.dev/api/signup', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ email: email, password: password })
					});
					if (!req.ok) {
						throw new Error(`HTTP error status: ${req.status}`);
					}
					const data = await req.json();
					console.log('data signing up user', data);
					return true;
				} catch (error) {
					console.log('error signing up user', error.message);
					return false;
				}
			},
			logIn: async (email, password) => {
				try {
					const req = await fetch('https://psychic-trout-v6v567rrxwv9hwxg4-3001.app.github.dev/api/signin', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ email: email, password: password })
					});
					if (!req.ok) {
						throw new Error(`HTTP error status: ${req.status}`);
					}
					const data = await req.json();
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					console.log('data logging in user', data);
					return true;
				} catch (error) {
					console.log('error logging in user', error.message);
					return false;
				}
			},
			private: async () => {
				try {
					let options = {
						headers: {
							'Authorization': 'Bearer' + sessionStorage.getItem('token')
						}
					}
					let response = await fetch('https://psychic-trout-v6v567rrxwv9hwxg4-3001.app.github.dev/api/private', options)
					let data = await response.json()
				}
				catch (error) {
					console.log(error)
				}
			}

			// authenticateUser: async () => {
			// 	const store = getStore();
			// 	const url = 'https://psychic-trout-v6v567rrxwv9hwxg4-3001.app.github.dev/api/private';
			
			// 	try {
			// 		console.log('Token', store.token)
			// 		const res = await fetch(url, {
			// 			method: 'GET',
			// 			headers: {
			// 				'Authorization': 'Bearer' + store.token,
			// 				'Access-Control-Allow-Origin': '*',
			// 				'Content-Type': 'application/json'
			// 			}
			// 		});
			// 		console.log('response status:', res.status)
			
			// 		if (!res.ok) {
			// 			console.log("Response Not Okay:", res.statusText)
			// 			return false;
			// 		}
			
			// 		const data = await res.json();
			// 		console.log('Fetched Data:', data)
			// 		setStore({ user: data });
			// 		return true;
			
			// 	} catch (err) {
			// 		console.log('Error Occurred', err);
			// 		return false;
			// 	}
			// },
			// tokenFromStore: async () => {
			// 	let store = getStore();
			// 	const token = sessionStorage.getItem('token');
			// 	if (token && token!= null && token!= undefined) 
			// 		setStore({token: token});
			// }
		}
	};
};
export default getState;