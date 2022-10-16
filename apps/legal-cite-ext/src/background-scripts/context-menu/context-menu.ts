import { ContextMenuFactory } from "@eugbyte-monorepo/web-ext";

export const createContextMenu = () => {
  const menuFactory = new ContextMenuFactory(
    "legal-cite-ext",
    "Copy with source",
    ["page"]
  );
  menuFactory.create().onClick((_info, _tab) => {});
};
