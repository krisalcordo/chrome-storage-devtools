export default defineContentScript({
	matches: ["*://*/*"],
	async main() {
		alert('test')
		console.log("Injecting script...");
		await injectScript("/injected.js", {
			keepInDom: true,
		});
		console.log("Done!");
	},
});