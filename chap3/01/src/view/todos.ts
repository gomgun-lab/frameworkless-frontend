import { Todo, State } from "../type";

let template: HTMLTemplateElement;

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById("todo-item") as HTMLTemplateElement;
  }

  return template.content.firstElementChild.cloneNode(true) as HTMLElement;
};

const getTodoElement = (todo: Todo) => {
  const { text, completed } = todo;

  const element = createNewTodoNode();

  const input = element.querySelector("input.edit") as HTMLInputElement;
  input.value = text;

  const label = element.querySelector("label") as HTMLLabelElement;
  label.textContent = text;

  if (completed) {
    element.classList.add("completed");
    element.querySelector("input").checked = true;
  }

  return element;
};

export default (targetElement: HTMLElement, { todos }: State) => {
  const newTodoList = targetElement.cloneNode(true) as HTMLElement;

  newTodoList.innerHTML = "";

  todos.map(getTodoElement).forEach((element) => {
    newTodoList.appendChild(element);
  });

  return newTodoList;
};
