/**
 * コンポーネント設置先
 */
import Component from './component';

export default class Panel extends Component<HTMLFormElement> {

  getTemplate() {
    return '<form class="panel"></form>';
  }

  add(parts: Component<Element>) {
    this.element.appendChild(parts.element);
  }

  toggleAnswerMode(flg: boolean) {
    this.element.classList.toggle('is-answer', flg);
  }
}