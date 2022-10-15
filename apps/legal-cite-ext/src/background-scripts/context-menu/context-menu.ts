import { browser, Tabs, Menus } from "webextension-polyfill-ts";

type callback = (i: Menus.OnClickData, t: Tabs.Tab | undefined) => void;

export class ContextMenuFactory {
    constructor(public id: string, public title: string, public contexts: Menus.ContextType[]) {}

    create() {
        const {id, title, contexts} = this;
        browser.contextMenus.create({
            id,
            title: browser.i18n.getMessage(title),
            contexts: [...contexts],
          });
        return this;
    }

    onClick(cb: callback) {
        const {id} = this;
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
