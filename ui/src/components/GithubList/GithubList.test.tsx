import { render, screen } from "@testing-library/react";
import { GithubList } from "./GithubList";

test("renders truck card insta handle", () => {
	it("should render", () => {
		render(<GithubList />);

		const githubButton = screen.getAllByAltText("Contributors' Github Account");
		expect(githubButton).toBeInTheDocument();
	});
});
