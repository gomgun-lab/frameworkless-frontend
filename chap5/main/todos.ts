import http from "./http/XMLHttpReqeust";

import { Todo } from "../../type/todo";

const HEADERS = {
  "Content-Type": "application/json",
};

const BASE_URL = "localhost:8080/api/todos";

const list = () => http.get(BASE_URL, HEADERS);

const create = (text: string) => {
  const todo = { text, completed: false };

  return http.post(BASE_URL, todo, HEADERS);
};

const update = (newTodo: Todo) => {
  const url = `${BASE_URL}/${newTodo.id}`;

  return http.patch(url, newTodo, HEADERS);
};

const deleteTodo = (id: Pick<Todo, "id">) => {
  const url = `${BASE_URL}/${id}`;

  return http.delete(url, HEADERS);
};

export default {
  list,
  create,
  update,
  delete: deleteTodo,
};
