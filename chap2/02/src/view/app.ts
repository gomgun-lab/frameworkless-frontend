import todosView from "./todos";
import counterView from "./couter";
import filterView from "./filters";

import { State } from "../type";

export default (targetElement: HTMLElement, state: State) => {
  const element = targetElement.cloneNode(true) as HTMLElement;

  const list = element.querySelector(".todo-list") as HTMLElement;
  const counter = element.querySelector(".todo-count") as HTMLElement;
  const filters = element.querySelector(".filters") as HTMLElement;

  list.replaceWith(todosView(list, state));
  counter.replaceWith(counterView(counter, state));
  filters.replaceWith(filterView(counter, state));

  return element;
};
