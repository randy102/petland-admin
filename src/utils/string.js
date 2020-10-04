export function currencyFormatter(num){
  return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}