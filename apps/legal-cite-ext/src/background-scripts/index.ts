import { ContextMenuFactory } from "./context-menu";

// IIFE
(() => {
  console.log("in background script");
  const menuFactory = new ContextMenuFactory("legal-cite-ext", "Copy with source", ["page"]);


})();

