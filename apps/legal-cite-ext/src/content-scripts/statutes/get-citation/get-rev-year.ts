export const getRevEdYear = (): string => {
  const elem = document.querySelector(".actNo");
  if (elem == null) {
    return "";
  }
  const actNumber = (elem as HTMLElement).innerText;
  const [year] = actNumber.match(/\d+/g) as RegExpMatchArray;
  return `${year} Rev Ed`;
};
