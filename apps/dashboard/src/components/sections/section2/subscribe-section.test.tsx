import React from "react";
import { render, screen } from "@testing-library/react";
import { SubscribeSection } from "./subscribe-section";

describe("test section2", () => {
  it("'Subscribed ✔️' text should be displayed when user has already subscribed", () => {
    const isSubscribed = true;
    const mockHandleSubscribe = () => Promise.resolve();
    render(<SubscribeSection handleSubscribe={mockHandleSubscribe} isSubscribed={isSubscribed} />);
    expect(screen.getByText("Subscribed ✔️")).toBeInTheDocument();
  });
});
