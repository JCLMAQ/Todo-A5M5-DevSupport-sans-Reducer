function indicator(i) {
  const cent = i % 100;

  if (cent >= 10 && cent <= 20)
    return 'th';

  const dec = i % 10;

  if (dec === 1) return 'st';
  if (dec === 2) return 'nd';
  if (dec === 3) return 'rd';

  return 'th';
}

module.exports = (i) => {
  if (typeof i !== 'number')
    throw new TypeError('Expected Number, got ' + (typeof i) + ' ' + i)

  return i + indicator(i)
}

