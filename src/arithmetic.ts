
/**
 * 四則演算
 */

// 小数点以下桁数取得
const getDecimalLength = (num: number): number => {
  const afterPoint = (num + '').split('.')[1];
  return afterPoint ? afterPoint.length : 0;
};

// 桁をそろえて整数化
const alignDigits = (
  num1: number,
  num2: number,
  callBack: (left: number, right: number, adjuster: number) => number
): number => {
  const decimalLength = Math.max(getDecimalLength(num1), getDecimalLength(num2));
  const adjuster = Math.pow(10, decimalLength);
  const int1 = calcMultiply(num1, adjuster);
  const int2 = calcMultiply(num2, adjuster);

  return callBack(int1, int2, adjuster);
};

interface Formula {
  (left: number, right: number): number
}

// 掛け算
const calcMultiply: Formula = (num1, num2) => {
  const int1 = +`${num1}`.replace('.', '');
  const int2 = +`${num2}`.replace('.', '');
  const adjuster = getDecimalLength(num1) + getDecimalLength(num2);
  return int1 * int2 / Math.pow(10, adjuster);
};

// 除算
const calcDivide: Formula = (num1, num2) => {
  if (num2 === 0) {
    throw new Error('0で割れません');
  }
  return alignDigits(num1, num2, (left, right) => left / right);
};

// 減算
const calcSubtract: Formula = (num1, num2) => (
  alignDigits(num1, num2, (left, right, adjuster) => (left - right) / adjuster)
);

// 加算
const calcAdd: Formula = (num1, num2) => (
  alignDigits(num1, num2, (left, right, adjuster) => (left + right) / adjuster)
);

export {
  calcAdd,
  calcSubtract,
  calcMultiply,
  calcDivide
};