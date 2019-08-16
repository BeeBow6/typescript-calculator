/**
 * 右辺入力後
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
import ResultState from './resultState';

export default class AfterRightSideState implements State {

  private static _instance: AfterRightSideState;
  private constructor() { }
  static get instance(): AfterRightSideState {
    if (!this._instance) {
      this._instance = new AfterRightSideState();
    }
    return this._instance;
  }

  inputNumber(app: App, value: NUMBER | number) {
    app.setOperator(OPERATOR.MULTIPLY);
    app.displayNumber(value);
    app.switchState(NumberState.instance);
  }
  inputPi(app: App, value: number) {
    this.inputNumber(app, value);
  }
  inputOperator(app: App, value: OPERATOR) {
    app.setOperator(value);
    app.switchState(OperatorState.instance);
  }
  inputLeftParen(app: App) {
    app.setOperator(OPERATOR.MULTIPLY);
    app.setLeftParen();
    app.switchState(BeforeLeftSideState.instance);
  }
  inputRightParen(app: App) {
    app.setRightParen();
  }
  inputInversion(app: App) {
    app.setOperator(OPERATOR.MULTIPLY);
    app.invertSign();
    app.switchState(NumberState.instance);
  }
  inputEqual(app: App) {
    try {
      app.executeCalculation();
      app.toggleAnswerMode(true);
      app.switchState(ResultState.instance);
    } catch (e) {
      app.setError(e);
    }
  }
  inputBack() { /* 対応しない */ }
  inputClear() { /* 対応しない */ }
  inputAllClear(app: App) {
    app.clearAll();
    app.switchState(BeforeLeftSideState.instance);
  }
}