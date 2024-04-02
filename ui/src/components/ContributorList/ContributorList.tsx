import { useState } from "react";
import { GithubButton } from "../ContributorButton/ContributorButton";

export function ContributorList() {
	const [listVisibility, setListVisibility] = useState("none");

	function toggleContributorListDisplay() {
		if (listVisibility === "none") {
			setListVisibility("flex");
		} else if (listVisibility === "flex") {
			setListVisibility("none");
		}
	}

	return (
		<div className="gH">
			<div className="gitHubLogo" onClick={toggleContributorListDisplay}>
				<img className="gHLogo" src={process.env.PUBLIC_URL + "/GitHub-Mark-64px.png"} alt="Contributors' Github Account" />
			</div>
			<div className="headerBtn" style={{ display: listVisibility }}>
				{GithubButton()}
			</div>
		</div>
	);
}
