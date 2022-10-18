import { browser, Tabs, Menus } from "webextension-polyfill-ts";

type Callback = (i: Menus.OnClickData, t: Tabs.Tab | undefined) => void;

export interface Options {
  id: string;
  title: string;
  contexts: Menus.ContextType[];
}

export class ContextMenuBuilder {
  id = "";
  title = "";
  contexts: Menus.ContextType[] = [];

  create(options: Options) {
    const { id, title, contexts } = options;
    this.id = id;
    this.title = title;
    this.contexts = [...contexts];

    browser.contextMenus.create({
      id,
      title,
      contexts: [...contexts],
    });
    return this;
  }

  onClick(cb: Callback) {
    const { id } = this;
    browser.contextMenus.onClicked.addListener((info, tab) => {
      switch (info.menuItemId) {
        case id:
          cb(info, tab);
          break;
        default:
          break;
      }
    });
    return this;
  }
}
