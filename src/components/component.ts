/**
 * コンポーネントの基底クラス
 */

interface ReplaceMap {
  [key: string]: string | number;
}

export default abstract class Component<T> {

  private _element: T;

  constructor(map: ReplaceMap = {}) {
    const div: HTMLElement = document.createElement('div');
    div.innerHTML = this.replaceTemplate(this.getTemplate(), map);
    this._element = div.firstElementChild as unknown as T;
  }

  /**
   * 例)"<p>{{placeholder_name}}</p>"
   */
  protected abstract getTemplate(): string;

  private replaceTemplate(temp: string, map: ReplaceMap = {}) {
    return temp.replace(/\{\{(.+?)\}\}/g, (_, key) => map[key] as string || '');
  }

  get element(): T {
    return this._element;
  }
}