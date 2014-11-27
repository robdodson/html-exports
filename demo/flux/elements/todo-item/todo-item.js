import { tmpl } from './todo-item.html';
import { TodoStore } from '../../js/stores/TodoStore';

export class TodoItem extends HTMLElement {
  createdCallback() {
    var root = this.createShadowRoot();
    root.appendChild(this.ownerDocument.importNode(tmpl.content, true));
  }
}
