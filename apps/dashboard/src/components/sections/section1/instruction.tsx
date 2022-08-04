import React from "react";

export const Instruction: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-white m-2">
        You have blocked notifications from the website
      </p>
      <p className="text-white m-2">
        To re-enable, click on the relevant icon on the left of the address bar,
        and edit the settings.
      </p>
      <img
        src="https://www.digitaltrends.com/wp-content/uploads/2020/04/google-chrome-lock.jpg?fit=720%2C480&p=1"
        alt="img from www.digitaltrends.com"
        title="www.digitaltrends.com/computing/how-to-enable-and-disable-chrome-notifications"
      />
    </div>
  );
};
