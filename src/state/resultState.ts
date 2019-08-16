/**
 * 結果表示後
 */
import {
  NUMBER,
  OPERATOR
} from '../setting';
import { App } from '../app';
import State from './state';
import BeforeLeftSideState from './beforeLeftSideState';
import NumberState from './numberState';
import OperatorState from './operatorState';

export default class ResultState implements State {

  private static _instance: ResultState;
  private constructor() { }
  static get instance(): ResultState {
    if (!this._instance) {
      this._instance = new ResultState();
    }
    return this._instance;
  }

  inputNumber(app: App, value: NUMBER | number) {
    app.clearHistory();
    app.toggleAnswerMode(false);
    app.displayNumber(value);
    app.switchState(NumberState.instance);
  }
  inputPi(app: App, value: number) {
    this.inputNumber(app, value);
  }
  inputOperator(app: App, value: OPERATOR) {
    app.clearHistory();
    app.toggleAnswerMode(false);
    app.determineNumber();
    app.setOperator(value);
    app.switchState(OperatorState.instance);
  }
  inputLeftParen(app: App) {
    app.clearAll();
    app.toggleAnswerMode(false);
    app.setLeftParen();
    app.switchState(BeforeLeftSideState.instance);
  }
  inputRightParen() { /* 対応しない */ }
  inputInversion(app: App) {
    app.clearHistory();
    app.toggleAnswerMode(false);
    app.invertSign();
    app.switchState(NumberState.instance);
  }
  inputEqual() { /* 対応しない */ }
  inputBack(app: App) {
    app.clearHistory();
    app.toggleAnswerMode(false);
    app.backSpaceDisplay();
    app.switchState(NumberState.instance);
  }
  inputClear(app: App) {
    this.inputAllClear(app);
  }
  inputAllClear(app: App) {
    app.clearAll();
    app.toggleAnswerMode(false);
    app.switchState(BeforeLeftSideState.instance);
  }
}