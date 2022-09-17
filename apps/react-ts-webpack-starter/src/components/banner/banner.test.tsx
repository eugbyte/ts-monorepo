import { Banner } from "./banner";
import { render, screen } from "@testing-library/react";

it("test banner", () => {
  render(<Banner />);
  expect(screen.getByText("Hello World")).toBeInTheDocument();
});
