export default function epochToString(epoch: number) {
  if (!epoch) return '';

  const date = new Date(0);
  date.setUTCMilliseconds(epoch);
  return date.toLocaleDateString('vi-VN');
}
