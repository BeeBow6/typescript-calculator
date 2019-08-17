/**
 * 計算過程
 */
import Component from './component';
import { OPERATOR } from '../setting';

export default class ProcessDisplay extends Component<HTMLInputElement> {

  private stack: (number | OPERATOR)[] = [];
  private currentOperator: OPERATOR | null = null;
  private countParen: number = 0;

  constructor() {
    super();
    this.clear();
  }

  // Override
  getTemplate() {
    return '<input value="" type="text" class="lbl lbl-small" readonly>';
  }

  get isParenMode(): boolean {
    return this.countParen > 0;
  }

  setNumber(number: number) {
    this.setStack(number);
  }

  setOperator(operator: OPERATOR = null) {
    this.currentOperator = operator;
    this.display();
  }

  setLeftParen() {
    this.countParen++;
    this.setStack(OPERATOR.LEFT_PAREN);
  }

  setRightParen() {
    if (!this.countParen) return;
    this.countParen--;
    this.stack.push(OPERATOR.RIGHT_PAREN);
    this.currentOperator = null;
    this.display();
  }

  getStack(): (number | OPERATOR)[] {
    const rightParens = Array(this.countParen).fill(OPERATOR.RIGHT_PAREN);
    return [...this.stack, ...rightParens];
  }

  setResult() {
    this.stack = this.getStack();
    this.display();
  }

  clear() {
    this.currentOperator = null;
    this.countParen = 0;
    this.stack = [];
    this.display();
  }

  private setStack(value: number | OPERATOR) {
    if (this.currentOperator) {
      this.stack.push(this.currentOperator);
      this.currentOperator = null;
    }
    if (this.stack.length && (value < 0)) {
      this.stack.push(OPERATOR.LEFT_PAREN, value, OPERATOR.RIGHT_PAREN);
    } else {
      this.stack.push(value);
    }
    this.display();
  }

  private display() {
    this.element.value = [...this.stack, this.currentOperator].join('');
  }
}