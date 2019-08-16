/**
 * 合計値を算出
 */
import {
  calcAdd,
  calcSubtract,
  calcMultiply,
  calcDivide
} from './arithmetic';
import { OPERATOR } from './setting';

// 共用型エイリアス
type StackType = OPERATOR | number;

const getPriority = (op: OPERATOR): number => {
  if (op === OPERATOR.ADD || op === OPERATOR.SUBTRACT) {
    return 1;
  }
  if (op === OPERATOR.MULTIPLY || op === OPERATOR.DIVIDE) {
    return 2;
  }
};

const comparePriority = (op1: OPERATOR, op2: OPERATOR): number => {
  return (getPriority(op1) - getPriority(op2));
};

// 逆ポーランドに並べ替え
const sortRPN = (elements: StackType[]): StackType[] => {
  let finalStack: StackType[] = [];
  let opStack: OPERATOR[] = [];

  elements.forEach(element => {
    if (typeof element === 'number') {
      if (Number.isFinite(element)) {
        finalStack.push(element);
      }
      return;
    }
    if (element === OPERATOR.LEFT_PAREN) {
      opStack.push(element);
      return;
    }
    if (element === OPERATOR.RIGHT_PAREN) {
      while (opStack.length) {
        const op = opStack.pop();
        if (op === OPERATOR.LEFT_PAREN) break;
        finalStack.push(op);
      }
      return;
    }
    if (opStack.length) {
      const buf: OPERATOR = opStack.slice(-1)[0];
      if (comparePriority(buf, element) > 0) {
        finalStack.push(opStack.pop());
      }
    }
    opStack.push(element);
  });

  finalStack.push(...opStack.reverse());

  return finalStack;
};

// 逆ポーランドで演算
const calcRPN = (inputList: StackType[]): number => {
  if (!inputList.length) {
    return 0;
  }
  const elements: StackType[] = sortRPN(inputList);
  let stack: StackType[] = [];

  elements.forEach(element => {
    if (typeof element === 'number') {
      stack.push(element);
      return;
    }
    const rightSide: StackType = stack.pop();
    const leftSide: StackType = stack.pop();

    if (typeof rightSide !== 'number' || typeof leftSide !== 'number') return;

    switch (element) {
      case OPERATOR.ADD:
        return stack.push(calcAdd(leftSide, rightSide));
      case OPERATOR.SUBTRACT:
        return stack.push(calcSubtract(leftSide, rightSide));
      case OPERATOR.MULTIPLY:
        return stack.push(calcMultiply(leftSide, rightSide));
      case OPERATOR.DIVIDE:
        return stack.push(calcDivide(leftSide, rightSide));
    }
  });

  const res: StackType = stack[0];
  return typeof res === 'number' ? res : 0;
};

export default calcRPN;