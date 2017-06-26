export default function getTempSign(temp) {
  if (temp > 0) {
    return '+';
  } else if (temp < 0) {
    return '-';
  }

  return '';
}
