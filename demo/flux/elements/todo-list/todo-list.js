import { tmpl } from './todo-list.html';

export class TodoList extends HTMLElement {
  createdCallback() {
    this.props = { todos: {} };
    // One of these days, Object.observe, you'll be my friend...
    // Object.observe(this.props, function(changes) {
    //   console.log(changes);
    // });

    var root = this.createShadowRoot();
    root.appendChild(this.ownerDocument.importNode(tmpl.content, true));
  }

  updateList() {
    var list = this.shadowRoot.querySelector('#list');

    // Not efficient. Ditch everything and re-render the list
    // Better to do this with fancy data bindings buuuuuuut...
    while(list.firstChild) {
      list.removeChild(list.firstChild);
    }

    Object.keys(this.props.todos).forEach(function(key) {
      var todo = this.props.todos[key];
      var item = document.createElement('li');
      item.textContent = todo.text;
      list.appendChild(item);
    }.bind(this));
  }
}
