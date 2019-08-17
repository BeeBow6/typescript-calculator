/**
 * 左辺入力待機
 */
import {
  NUMBER,
  OPERATOR
} from '../setting';
import { App } from '../app';
import State from './state';
import NumberState from './numberState';
import OperatorState from './operatorState';

export default class BeforeLeftSideState implements State {
  // Singleton
  private static _instance: BeforeLeftSideState;
  private constructor() { }
  static get instance(): BeforeLeftSideState {
    if (!this._instance) {
      this._instance = new BeforeLeftSideState();
    }
    return this._instance;
  }

  inputNumber(app: App, value: NUMBER | number) {
    app.displayNumber(value);
    app.switchState(NumberState.instance);
  }
  inputPi(app: App, value: number) {
    this.inputNumber(app, value);
  }
  inputOperator(app: App, value: OPERATOR) {
    app.displayNumber(NUMBER.ZERO);
    app.determineNumber();
    app.setOperator(value);
    app.switchState(OperatorState.instance);
  }
  inputLeftParen(app: App) {
    app.setLeftParen();
  }
  inputInversion(app: App) {
    app.invertSign();
    app.switchState(NumberState.instance);
  }
  inputRightParen() { /* 対応しない */ }
  inputEqual() { /* 対応しない */ }
  inputBack() { /* 対応しない */ }
  inputClear() { /* 対応しない */ }
  inputAllClear(app: App) {
    app.clearAll();
  }
}