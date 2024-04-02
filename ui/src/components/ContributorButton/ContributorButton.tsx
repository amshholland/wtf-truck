export function GithubButton() {
	const contributorData = [
		{ name: "Amber Holland", url: "https://github.com/amshholland" },
		{ name: "Dair Smith", url: "https://github.com/dairsmithgit" },
		{ name: "Patrick Humphries", url: "https://github.com/PatrickHumphries" },
	];

	return (
		<>
			{contributorData.map((contributor) => {
				<a href={contributor.url}>
					<button className="headerButton">{contributor.name}</button>
				</a>;
			})}
		</>
	);
}
