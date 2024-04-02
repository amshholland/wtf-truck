import { useState } from "react";

export function GithubList() {
	const [ghToggle, setGhToggle] = useState("none");

	function gitHubDisplay() {
		if (ghToggle === "none") {
			setGhToggle("flex");
		} else if (ghToggle === "flex") {
			setGhToggle("none");
		}
	}

	return (
		<div className="gH">
			<div className="gitHubLogo" onClick={() => gitHubDisplay()}>
				<img className="gHLogo" src={process.env.PUBLIC_URL + "/GitHub-Mark-64px.png"} alt="Contributors' Github Account" />
			</div>
			<div className="headerBtn" style={{ display: ghToggle }}>
				<a href="https://github.com/amshholland">
					<button className="headerButton">Amber Holland</button>
				</a>
				<a href="https://github.com/dairsmithgit">
					<button className="headerButton">Dair Smith</button>
				</a>
				<a href="https://github.com/PatrickHumphries">
					<button className="headerButton">Patrick Humphries</button>
				</a>
			</div>
		</div>
	);
}
