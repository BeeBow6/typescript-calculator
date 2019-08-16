/**
 * 電卓アプリ
 */
import {
  BUTTONS,
  BUTTON_TYPE,
  NUMBER,
  OPERATOR
} from './setting';
import Calc from './calculation';
import State from './state/state';
import InitialState from './state/beforeLeftSideState';
import ErrorState from './state/errorState';
import {
  Panel,
  Button,
  ProcessDisplay,
  MainDisplay
} from './components/index';

const isNUMBER = (test: any): test is NUMBER => {
  return Object.values(NUMBER).includes(test);
};

class App {

  private panel: Panel;
  private process: ProcessDisplay;
  private display: MainDisplay;
  private state: State;

  constructor(rootElement: HTMLElement) {

    this.panel = new Panel();
    this.process = new ProcessDisplay();
    this.display = new MainDisplay();

    this.panel.add(this.process);
    this.panel.add(this.display);

    this.handleClick = this.handleClick.bind(this);

    BUTTONS.forEach(props => {
      this.panel.add(
        new Button({
          ...props,
          onClick: this.handleClick
        })
      );
    });

    rootElement.appendChild(this.panel.element);

    this.switchState(InitialState.instance);
  }

  /**
   * @param {BUTTON_TYPE} type 
   * @param {String} value 
   */
  private handleClick(type: BUTTON_TYPE, value: NUMBER | OPERATOR) {
    switch (type) {
      case BUTTON_TYPE.NUMBER:
        if (isNUMBER(value)) {
          this.state.inputNumber(this, value);
          break;
        }
      case BUTTON_TYPE.PI:
        this.state.inputPi(this, Math.PI);
        break;
      case BUTTON_TYPE.OPERATOR:
        if (!isNUMBER(value)) {
          this.state.inputOperator(this, value);
          break;
        }
      case BUTTON_TYPE.LEFT_PAREN:
        this.state.inputLeftParen(this);
        break;
      case BUTTON_TYPE.RIGHT_PAREN:
        this.state.inputRightParen(this);
        break;
      case BUTTON_TYPE.INVERSION:
        this.state.inputInversion(this);
        break;
      case BUTTON_TYPE.EQUAL:
        this.state.inputEqual(this);
        break;
      case BUTTON_TYPE.BACKSPACE:
        this.state.inputBack(this);
        break;
      case BUTTON_TYPE.CLEAR:
        this.state.inputClear(this);
        break;
      case BUTTON_TYPE.ALL_CLEAR:
        this.state.inputAllClear(this);
        break;
      default:
        throw new Error('Unknown input value.');
    }
  }

  // 状態切替
  switchState(nextState: State) {
    this.state = nextState;
  }
  // 数値表示
  displayNumber(value: number | NUMBER) {
    this.display.setNumber(value);
  }
  // 数値追加表示
  addDisplayNumber(value: NUMBER) {
    this.display.addNumber(value);
  }
  // 演算子記憶
  setOperator(operator?: OPERATOR) {
    this.process.setOperator(operator);
  }
  // 数値確定
  determineNumber() {
    const num: number = this.display.getNumber();
    this.process.setNumber(num);
  }
  // 左括弧追加
  setLeftParen() {
    this.process.setLeftParen();
  }
  // 右括弧追加
  setRightParen() {
    this.process.setRightParen();
  }
  // 符号反転
  invertSign() {
    this.display.invertSign();
  }
  // 演算
  executeCalculation() {
    const result: number = Calc(this.process.getStack());
    this.display.setNumber(result);
  }
  // 数値1文字クリア
  backSpaceDisplay() {
    this.display.removeLastNumber();
  }
  // 表示クリア
  clearDisplay() {
    this.display.clear();
  }
  // 履歴クリア
  clearHistory() {
    this.process.clear();
  }
  // 全てクリア
  clearAll() {
    this.process.clear();
    this.display.clear();
  }
  // エラー！！！
  setError(e: Error) {
    this.display.setError(e.message);
    this.switchState(ErrorState.instance);
  }
  // 解答表示中
  toggleAnswerMode(flg: boolean = false) {
    this.panel.toggleAnswerMode(flg);
  }
}

export { App };

let apps: { [key: string]: App } = {};

export default (rootSelector: string): boolean => {
  const rootElement: HTMLElement = document.querySelector(rootSelector);

  if (!rootElement) {
    return false;
  }
  if (!(rootSelector in apps)) {
    apps[rootSelector] = new App(rootElement);
  }
  return true;
};