import React from "react";
import ReactDOM from "react-dom/client";
import DevToolsApp from "./DevToolsApp";


browser.devtools.panels.create(
	"Example Panel",
	"icon/128.png",
	"devtools.html",
	() => {
		ReactDOM.createRoot(document.getElementById('root')!).render(
			<React.StrictMode>
				<DevToolsApp />
			</React.StrictMode>,
		);
	}
)
