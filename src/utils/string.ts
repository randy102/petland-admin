export function currencyFormatter(num: any): string{
  return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}