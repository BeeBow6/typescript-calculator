/**
 * 入力値表示
 */
import Component from './component';
import {
  MINUS,
  NUMBER
} from '../setting';

const LENGTH_MAX: number = 12;

export default class MainDisplay extends Component<HTMLInputElement>{

  private data: string = '';
  private isDecimal: boolean = false;
  private isNegative: boolean = false;

  constructor() {
    super();
    this.clear();
  }

  getTemplate() {
    return '<input value="" type="text" class="lbl lbl-large" readonly>';
  }

  addNumber(value: NUMBER) {
    if (this.data.length >= LENGTH_MAX) return;

    if (value === NUMBER.POINT) {
      if (this.isDecimal) {
        return;
      }
      if (!this.data) {
        this.data = NUMBER.ZERO;
      }
      this.isDecimal = true;
    } else if (this.data === NUMBER.ZERO) {
      this.data = '';
    }
    this.data += value;
    this.displayNumber();
  }

  setNumber(value: NUMBER | number) {
    this.reset();
    if (typeof value !== 'number') {
      this.addNumber(value);
      return;
    }
    this.isNegative = value < 0;
    this.data = `${Math.abs(value) || ''}`.slice(0, LENGTH_MAX);
    this.displayNumber();
    return;
  }

  invertSign() {
    this.isNegative = !this.isNegative;
    this.displayNumber();
  }

  getNumber() {
    return Number.parseFloat(this.element.value) || 0;
  }

  removeLastNumber() {
    this.data = this.data.slice(0, -1);
    this.displayNumber();
  }

  clear() {
    this.toggleErrorMode(false);
    this.reset();
    this.displayNumber();
  }

  setError(message: string) {
    this.toggleErrorMode(true);
    this.element.value = message;
  }

  private displayNumber() {
    const value = (this.isNegative ? MINUS : '') + this.data;
    this.element.value = value || NUMBER.ZERO;
  }

  private reset() {
    this.data = '';
    this.isDecimal = this.isNegative = false;
  }

  private toggleErrorMode(flg = false) {
    this.element.classList.toggle('is-error', flg);
  }

}
