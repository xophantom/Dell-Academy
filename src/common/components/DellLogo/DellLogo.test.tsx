import React from "react";
import { render } from "@testing-library/react";
import { DellLogo } from ".";

describe("<DellLogo />", () => {
  it("renders without crashing", () => {
    const { container } = render(<DellLogo />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should contain the Dell logo", () => {
    const { getByTestId } = render(<DellLogo />);
    const svgElement = getByTestId("dell-logo");
    expect(svgElement).toBeInTheDocument();
  });
});
