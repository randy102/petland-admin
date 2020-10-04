export function getSelectedKey(path: string): string[] {
  const pages = ["", "user", "site", "shop", "menu", "order", "config"];

  const curPath = path.split("/")[2] || "user";
  const curKey = String(pages.indexOf(curPath));
  return [curKey];
}