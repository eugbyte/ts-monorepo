import { browser } from "webextension-polyfill-ts";
import { writeHTML } from "./clipboard";
import { getCitation } from "./get-citation";

// IIFE
(async () => {
  console.log("in content script");
  const target: [HTMLElement | null] = [null];

  document.addEventListener("contextmenu", (event) => {
    target[0] = event.target as HTMLElement;
  });

  browser.runtime.onMessage.addListener(async (msg: string) => {
    if (target[0] != null && msg === "legal-cite-ext") {
      const citation = getCitation(target[0]);
      const content = `<span style="color:red"><i>${citation}</i>`;
      await writeHTML(content);
    }
  });
})();
