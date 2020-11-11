export const getStateFromLocalStorage = key => {
	return JSON.parse(localStorage.getItem(key));
}

export const setStateInLocalStorage = (key, state) => {
	localStorage.setItem(key, JSON.stringify(state));
}
