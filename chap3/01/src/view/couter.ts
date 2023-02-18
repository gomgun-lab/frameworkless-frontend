import { Todo, State } from "../type";

const getTodoCount = (todos: Todo[]) => {
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;

  if (length === 1) {
    return "1 item left.";
  }

  return `${length} Items left`;
};

export default (targetElement: HTMLElement, { todos }: State) => {
  const newTodoCounter = targetElement.cloneNode(true) as HTMLElement;
  newTodoCounter.textContent = getTodoCount(todos);
  return newTodoCounter;
};
