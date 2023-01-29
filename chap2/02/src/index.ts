import getTodos from "./util/getTodos";
import view from "./view/app";

import { State } from "./type";

const state: State = {
  todos: getTodos(),
  currentFilter: "All",
};

const main = document.querySelector(".todoapp") as HTMLElement;

window.requestAnimationFrame(() => {
  const newMain = view(main, state);
  main.replaceWith(newMain);
});
