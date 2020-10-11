export function getLang(lang: string, row: any) {
  return row && {
    _id: row?._id,
    ...row.data.find((record: any) => record.lang === lang),
  };
}

export function filterLang(lang: string, data = []) {
  return data.map((row: any) => getLang(lang, row));
}