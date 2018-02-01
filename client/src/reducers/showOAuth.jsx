export default function showOAuth(state, action) {
	switch (action.type) {
		case 'TOGGLE_ON':
			return { toggle: "C'est maintenant on" }
		case 'TOGGLE_OFF':
			return { toggle: "C'est maintenant off" }
		default: 
			return state
	}
}