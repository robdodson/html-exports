import { tmpl } from './todo-form.html';
import { TodoActions } from '../../js/actions/TodoActions';

export class TodoForm extends HTMLElement {
  createdCallback() {
    var root = this.createShadowRoot();
    root.appendChild(this.ownerDocument.importNode(tmpl.content, true));

    this.addBtn = root.querySelector('#addBtn');
    this.txtInput = root.querySelector('#txtInput');
    this.addBtn.onclick = this.addTodo.bind(this);
  }

  addTodo() {
    var txt = this.txtInput.value.trim();
    if (txt) {
      TodoActions.create(txt);
    }
  }
}
