export const writeHTML = async (content: string) => {
  const type = "text/html";
  const blob = new Blob([content], { type });
  const item = new ClipboardItem({ [type]: blob });
  await navigator.clipboard.write([item]);
};
