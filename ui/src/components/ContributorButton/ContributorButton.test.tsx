import { render, screen } from "@testing-library/react";
import { GithubButton } from "./ContributorButton";

test("renders truck card insta handle", () => {
	it("should render", () => {
		render(<GithubButton />);

		const contributorButton = screen.getAllByAltText("Contributors' Github Account");
		expect(contributorButton).toBeInTheDocument();
	});
});
