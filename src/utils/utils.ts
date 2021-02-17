// eslint-disable-next-line
export const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const uid = (len: number) => {
  const buf = [];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charLen = chars.length;

  for (let i = 0; i < len; i += 1) {
    buf.push(chars[getRandomInt(0, charLen - 1)]);
  }

  return buf.join('');
};
