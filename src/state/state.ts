/**
 * stateインターフェイス
 */
import { App } from '../app';
import {
  NUMBER,
  OPERATOR
} from '../setting';

export default interface State {
  inputNumber(app: App, value: NUMBER | number): void;
  inputPi(app: App, value: number): void;
  inputOperator(app: App, value: OPERATOR): void;
  inputLeftParen(app: App): void;
  inputRightParen(app: App): void;
  inputInversion(app: App): void;
  inputEqual(app: App): void;
  inputBack(app: App): void;
  inputClear(app: App): void;
  inputAllClear(app: App): void;
}