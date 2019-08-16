/**
 * 演算子入力状態
 */
import {
  NUMBER,
  OPERATOR
} from '../setting';
import { App } from '../app';
import State from './state';
import BeforeLeftSideState from './beforeLeftSideState';
import NumberState from './numberState';
import ResultState from './resultState';

export default class OperatorState implements State {

  private static _instance: OperatorState;
  private constructor() { }
  static get instance(): OperatorState {
    if (!this._instance) {
      this._instance = new OperatorState();
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
    app.setOperator(value);
  }
  inputLeftParen(app: App) {
    app.setLeftParen();
    app.switchState(BeforeLeftSideState.instance);
  }
  inputRightParen() { /* 対応しない */ }
  inputInversion(app: App) {
    app.clearDisplay();
    app.invertSign();
    app.switchState(NumberState.instance);
  }
  inputEqual(app: App) {
    try {
      app.setOperator();
      app.executeCalculation();
      app.toggleAnswerMode(true);
      app.switchState(ResultState.instance);
    } catch (e) {
      app.setError(e);
    }
  }
  inputBack() { /* 対応しない */ }
  inputClear(app: App) {
    app.clearDisplay();
  }
  inputAllClear(app: App) {
    app.clearAll();
    app.switchState(BeforeLeftSideState.instance);
  }
}