import styles from './extensionSingle.module.scss';
const ExtensionSingle = ({ extension }: { extension: chrome.management.ExtensionInfo }) => {

	const clickEvent = (extensionId: string) => {
		chrome.tabs.create(
			{ url: `chrome-extension://${extensionId}/manifest.json` },
			(tab) => {
				if (tab.id !== undefined) {
					setTimeout(() => {
						chrome.tabs.reload(tab.id!); // The "!" tells TypeScript it's safe
					}, 100);
				} else {
					console.warn("Tab ID is undefined, cannot reload.");
				}
			}
		);
	};

	return (
		<div className="extension">
			<span className={styles.link} onClick={() => clickEvent(extension.id)}>
				{extension.name}
			</span>
		</div>
	)
}
// 
export { ExtensionSingle }