import titleCase from "lodash.startcase";

export const getChapter = (): string => {
  const chapter = (document.getElementById("aT-") as HTMLElement).innerText;
  return titleCase(chapter);
};
