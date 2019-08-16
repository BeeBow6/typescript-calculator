/**
 * ボタン
 */
import Component from './component';
import {
  ButtonParams,
  BUTTON_TYPE,
  NUMBER,
  OPERATOR
} from '../setting';

interface ButtonHandler {
  (type: BUTTON_TYPE, value?: NUMBER | OPERATOR): void;
}

interface ButtonProps extends ButtonParams {
  onClick: ButtonHandler;
}

export default class Button extends Component<HTMLButtonElement> {

  private type: BUTTON_TYPE;
  private value: NUMBER | OPERATOR;
  private keyCodeList: string[];
  private onClick: ButtonHandler;

  constructor({ text, order, size, ...props }: ButtonProps) {
    super({ text, order });

    this.element.style.gridColumnEnd = size ? 'span ' + size : '';

    if (props.type === BUTTON_TYPE.NUMBER) {
      this.element.classList.add('btn-num');
    }

    this.type = props.type;
    this.value = props.value;
    this.keyCodeList = props.keyCodeList;
    this.onClick = props.onClick;

    this.element.addEventListener('click', this.handleClick.bind(this));
    document.addEventListener('keydown', this.handleKeydown.bind(this));
    document.addEventListener('keyup', this.handleKeyup.bind(this));
  }

  // Override
  getTemplate() {
    return `<button type="button" class="btn" style="order:{{order}}">
      {{text}}
    </button>`;
  }

  private handleClick() {
    this.onClick(this.type, this.value);
  }

  private handleKeydown(event: KeyboardEvent) {
    this.element.classList.toggle('btn-active', this.checkKeyCode(event));
  }

  private handleKeyup(event) {
    this.element.classList.remove('btn-active');
    if (this.checkKeyCode(event)) {
      this.handleClick();
    }
  }

  private checkKeyCode(event: KeyboardEvent) {
    const shiftKey = event.shiftKey ? 'shift' : '';
    return this.keyCodeList.includes(shiftKey + event.keyCode);
  }
}