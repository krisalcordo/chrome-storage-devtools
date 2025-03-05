const fetchExtensions = () => {
	return new Promise((resolve) => {
		chrome.runtime.sendMessage({ action: "getExtensions" }, (response) => {
			if (response && response.extensions) {
				resolve(response.extensions);
			} else {
				resolve([]);
			}
		});
	});
}

export { fetchExtensions }