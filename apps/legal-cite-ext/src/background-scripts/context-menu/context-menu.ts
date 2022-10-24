import { browser } from "webextension-polyfill-ts";

export const createContextMenu = (tabId: number) => {
  const options = {
    id: "legal-cite-ext",
    title: "Copy with source",
    contexts: ["page"],
  };

  browser.contextMenus.create({
    id: options.id,
    title: options.title,
    contexts: ["page"],
  });

  browser.contextMenus.onClicked.addListener((info) => {
    switch (info.menuItemId) {
      case options.id:
        browser.tabs.sendMessage(tabId, "legal-cite-ext");
        break;
      default:
        break;
    }
  });
};
