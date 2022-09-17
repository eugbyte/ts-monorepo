import { greet } from "@eugbyte-monorepo/utils";

export const Banner = () => {
  greet();
  return <p className="text-3xl font-bold underline">Hello World</p>;
};
