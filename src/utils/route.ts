import { ROUTES } from "pages/Admin/RouteConfig";

export function getSelectedKey(path: string): string[] {
  const pages = ROUTES.map(route => route.path)
  const curPath = path.split("/")[2] || "user";
  const curKey = String(pages.indexOf("/"+curPath) + 1);

  return [curKey];
}