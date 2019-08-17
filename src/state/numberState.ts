/**
 * 数値入力状態
 */
import {
  NUMBER,
  OPERATOR
} from '../setting';
import { App } from '../app';
import State from './state';
import BeforeLeftSideState from './beforeLeftSideState';
import AfterRightSideState from './afterRightSideState';
import OperatorState from './operatorState';
import ResultState from './resultState';

export default class NumberState implements State {

  private static _instance: NumberState;
  private constructor() { }
  static get instance(): NumberState {
    if (!this._instance) {
      this._instance = new NumberState();
    }
    return this._instance;
  }

  inputNumber(app: App, value: NUMBER) {
    app.addDisplayNumber(value);
  }
  inputPi(app: App, value: number) {
    app.displayNumber(value);
  }
  inputOperator(app: App, value: OPERATOR) {
    try {
      app.determineNumber();
      app.executeCalculation();
      app.setOperator(value);
      app.switchState(OperatorState.instance);
    } catch (e) {
      app.setError(e);
    }
  }
  inputLeftParen(app: App) {
    app.determineNumber();
    app.setOperator(OPERATOR.MULTIPLY);
    app.setLeftParen();
    app.switchState(BeforeLeftSideState.instance);
  }
  inputRightParen(app: App) {
    if (!app.checkParenMode()) return;

    try {
      app.determineNumber();
      app.setRightParen();
      app.executeCalculation();
      app.switchState(AfterRightSideState.instance);
    } catch (e) {
      app.setError(e);
    }
  }
  inputInversion(app: App) {
    app.invertSign();
  }
  inputBack(app: App) {
    if (app.backSpaceDisplay()) {
      app.switchState(BeforeLeftSideState.instance);
    }
  }
  inputEqual(app: App) {
    try {
      app.determineNumber();
      app.executeCalculation();
      app.toggleAnswerMode(true);
      app.switchState(ResultState.instance);
    } catch (e) {
      app.setError(e);
    }
  }
  inputClear(app: App) {
    app.clearDisplay();
    app.switchState(BeforeLeftSideState.instance);
  }
  inputAllClear(app: App) {
    app.clearAll();
    app.switchState(BeforeLeftSideState.instance);
  }
}