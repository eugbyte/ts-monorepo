import { ContextMenuBuilder, Options } from "@eugbyte-monorepo/web-ext";

export const createContextMenu = () => {
  const options: Options = {
    id: "legal-cite-ext",
    title: "Copy with source",
    contexts: ["page"],
  };
  const menuBuilder = new ContextMenuBuilder();
  menuBuilder
    .create(options)
    .onClick((info, tab) => console.log({ info, tab }));
};
