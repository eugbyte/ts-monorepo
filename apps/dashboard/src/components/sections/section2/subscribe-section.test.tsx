import React from "react";
import { render, screen } from "@testing-library/react";
import { SubscribeSection } from "./subscribe-section";
import { QUERY_STATUS } from "~/models/enums";

describe("test section2", () => {
  it("'Subscribed ✔️' text should be displayed when user has already subscribed", () => {
    const isSubscribed = true;
    const mockHandleSubscribe = () => Promise.resolve();
    render(
      <SubscribeSection
        handleSubscribe={mockHandleSubscribe}
        isSubscribed={isSubscribed}
        subscriptionQueryStatus={QUERY_STATUS.UNINITIALIZED}
      />
    );
    expect(screen.getByText("Subscribed ✔️")).toBeInTheDocument();
  });
});
