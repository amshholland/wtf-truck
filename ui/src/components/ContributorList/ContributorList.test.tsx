import { render, screen } from "@testing-library/react";
import { ContributorList } from "./ContributorList";

test("renders truck card insta handle", () => {
	it("should render", () => {
		render(<ContributorList />);

		const githubButton = screen.getAllByAltText("Contributors' Github Account");
		expect(githubButton).toBeInTheDocument();
	});
});
