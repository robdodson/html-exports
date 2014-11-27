import { tmpl } from './todo-app.html';
import { TodoStore } from '../../js/stores/TodoStore';

function getTodoState() {
  return {
    allTodos: TodoStore.getAll()
  }
}

export class TodoApp extends HTMLElement {
  createdCallback() {
    var root = this.createShadowRoot();
    root.appendChild(this.ownerDocument.importNode(tmpl.content, true));
    
    this.list = root.querySelector('todo-list');
    
    // argh... the child element hasn't run createdCallback yet
    // so we can't set its props immediately. We have to
    // wait a turn.
    setTimeout(function() {
      this.setState(getTodoState());
    }.bind(this), 0);
  }

  attachedCallback() {
    TodoStore.addChangeListener(this.onChange_.bind(this));
  }

  detachedCallback() {
    TodoStore.removeChangeListener(this.onChange_.bind(this));
  }

  setState(state) {
    this.list.props.todos = state.allTodos;
    this.list.updateList();
  }

  onChange_() {
    this.setState(getTodoState());
  }
}
