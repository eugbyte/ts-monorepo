import React from "react";
import { render, screen } from "@testing-library/react";
import { SubscribeSection } from "./subscribe-section";

describe("test section2", () => {
    it("'Subscribed ✔️' text should be displayed when user has already subscribed", () => {
        jest.spyOn(localStorage, "getItem").mockReturnValueOnce("true");
        const mockHandleSubscribe = () => Promise.resolve();
        render(<SubscribeSection handleSubscribe={mockHandleSubscribe}/>)
        expect(screen.getByText("Subscribed ✔️")).toBeInTheDocument();
    });
});