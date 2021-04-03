export function currencyFormatter(num: any): string{
  return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function removeAccents(str: string): string {
  if(!str) return str;
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function capitalize(str: string): string {
  if(!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}