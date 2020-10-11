export function getLang(lang: string, row: any) {
  const {data, ...rest} = row || {}
  return row && {
    _id: row?._id,
    ...row.data.find((record: any) => record.lang === lang),
    ...rest
  };
}

export function filterLang(lang: string, data = []) {
  return data.map((row: any) => getLang(lang, row));
}