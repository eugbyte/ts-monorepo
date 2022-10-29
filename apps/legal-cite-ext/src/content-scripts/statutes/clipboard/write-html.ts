import copy from "copy-to-clipboard";

export const writeHTML = async (content: string) => {
  const type = "text/html";
  const blob = new Blob([content], { type });
  // ClipboardItem is not supported in firefox
  // execCommand is not supported in chrome
  if ("ClipboardItem" in window) {
    const item = new ClipboardItem({ [type]: blob });
    await navigator.clipboard.write([item]);
  } else {
    copy(content, {
      format: type,
    });
  }
};
