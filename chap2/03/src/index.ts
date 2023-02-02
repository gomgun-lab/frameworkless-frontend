import getTodos from "./util/getTodos";
import todoView from "./view/todos";
import couterView from "./view/couter";
import filterView from "./view/filters";
import registry from "./registry";
import { State } from "./type";

registry.add("todos", todoView);
registry.add("counter", couterView);
registry.add("filters", filterView);

const state: State = {
  todos: getTodos(),
  currentFilter: "All",
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector(".todoapp") as HTMLElement;
    const newMain = registry.renderRoot(main, state);
    main.replaceWith(newMain);
  });
};

window.setInterval(() => {
  state.todos = getTodos();
  render();
}, 1000);

render();
