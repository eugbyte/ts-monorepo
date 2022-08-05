import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import * as cred from "~/libs/credentials/generate-credentials";

jest.mock("nanoid");

describe("test main page", () => {
  beforeEach(() => {
    // nanoid uses ESM, but jest does not support ESM yet
    // https://github.com/ai/nanoid/issues/365#issuecomment-1154068295
    jest.spyOn(cred, "generateCompany").mockReturnValue("Mock-Company");
    jest.spyOn(cred, "generateUserID").mockReturnValue("123_john@mail.com");
  });

  it("test main page", () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  })
});