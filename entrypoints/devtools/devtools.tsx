import React from "react";
import ReactDOM from "react-dom/client";
import DevToolsApp from "./DevToolsApp";

browser.devtools.panels.create(
	"Example Panel",
	"icon/128.png",
	"index.html",
	(panel) => {
		panel.onShown.addListener((panel) => {
			console.log("Panel shown!", panel);
			ReactDOM.createRoot(document.getElementById('root')!).render(
				<React.StrictMode>
					<DevToolsApp />
				</React.StrictMode>,
			);
		})
	}
);