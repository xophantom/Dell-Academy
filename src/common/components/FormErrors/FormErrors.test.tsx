import { render } from "@testing-library/react";
import React from "react";
import { FormErrors } from "./FormErrors";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

const mockErrors = {
  field1: { type: "required", message: "Field 1 is required" },
};

describe("<FormErrors />", () => {
  let useFormContextSpy = useFormContext as jest.Mock;

  beforeEach(() => {
    useFormContextSpy.mockReturnValue({ formState: { errors: mockErrors } });
  });

  it("renders without crashing", () => {
    const { container } = render(<FormErrors />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render error message when there are errors", () => {
    const { getByText } = render(<FormErrors />);
    expect(getByText("Field 1 is required")).toBeInTheDocument();
  });

  it("should not render error message when there are no errors", () => {
    useFormContextSpy.mockReturnValue({ formState: { errors: [] } });
    const { queryByRole } = render(<FormErrors />);
    expect(queryByRole("alert")).not.toBeInTheDocument();
  });
});
