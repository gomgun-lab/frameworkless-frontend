import getTodos from "./util/getTodos";

import appView from "./view/app";
import todoView from "./view/todos";
import couterView from "./view/couter";
import filterView from "./view/filters";

import registry from "./registry";

import applyDiff from "./reconciler";

import { State } from "./type";

registry.add("app", appView);
registry.add("todos", todoView);
registry.add("counter", couterView);
registry.add("filters", filterView);

const state: State = {
  todos: getTodos(),
  currentFilter: "All",
};

const events = {
  deleteItem: (index: number) => {
    state.todos.splice(index, 1);
    render();
  },
  addItem: (text: string) => {
    state.todos.push({
      text,
      completed: false,
    });
    render();
  },
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root") as HTMLElement;
    const newMain = registry.renderRoot(main, state, events);
    applyDiff(document.body, main, newMain);
  });
};

// window.setInterval(() => {
//   state.todos = getTodos();
//   render();
// }, 1000);

render();
