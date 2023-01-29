import { Todo, State } from "./type";

const getTodoElement = (todo: Todo) => {
  const { text, completed } = todo;
  return `
    <li ${completed ? 'class="completed"' : ""}>
      <div class="view">
        <input ${completed ? "checked" : ""} class="toggle" type="checkbox"/>
        <label>${text}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${text}"/>
    </li>
  `;
};

const getTodoCount = (todos: Todo[]) => {
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;

  if (length === 1) {
    return "1 item left.";
  }

  return `${length} Items left`;
};

export default (targetElement: HTMLElement, state: State) => {
  const { currentFilter, todos } = state;

  const element = targetElement.cloneNode(true) as HTMLElement;

  const list = element.querySelector(".todo-list");
  const counter = element.querySelector(".todo-count");
  const filters = element.querySelector(".filters");

  list.innerHTML = todos.map(getTodoElement).join("");
  counter.textContent = getTodoCount(todos);

  // Array.from 배열을 복사하는 이유를 모르겠음

  Array.from(filters.querySelectorAll("li a")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }
  });

  return element;
};
