/**
 * エラー状態
 */
import { App } from '../app';
import State from './state';
import BeforeLeftSideState from './beforeLeftSideState';

export default class ErrorState implements State {

  private static _instance: ErrorState;
  private constructor() { }
  static get instance(): ErrorState {
    if (!this._instance) {
      this._instance = new ErrorState();
    }
    return this._instance;
  }

  inputNumber() { /* 無視 */ }
  inputPi() { /* 無視 */ }
  inputOperator() { /* むし */ }
  inputLeftParen() { /* ムシ */ }
  inputRightParen() { /* 虫 */ }
  inputInversion() { /* 無私 */ }
  inputEqual() { /* 蟲 */ }
  inputBack() { /* MUSHI */ }
  inputClear() { /* 蒸し */ }
  inputAllClear(app: App) {
    app.clearAll();
    app.switchState(BeforeLeftSideState.instance);
  }
}