import React from "react";

export const About: React.FC = () => {
  return (
    <section className="my-10 mx-1">
      <h1 className="text-2xl text-white font-bold text-center">
        Web push notification SaaS
      </h1>
      <p className="text-white break-words max-w-3xl text-justify">
        As a customer, I want to receive notification updates on my computer
        (e.g. food order), so that I can continue to focus on what I have been
        doing on my computer without having to constantly check my phone.
      </p>
    </section>
  );
};
