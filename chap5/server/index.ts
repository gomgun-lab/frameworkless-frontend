import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidV4 } from "uuid";
import findIndex from "lodash/findIndex";

import { Todo } from "../../type/todo";

const PORT = 8080;

const app = express();
let todos: Todo[] = [
  {
    text: "text1",
    completed: false,
    id: "1",
  },
];

app.use(bodyParser.json());

app.get("/api/todos", (req, res) => {
  res.send(todos);
});

app.post("/api/todos", (req, res) => {
  const newTodo: Todo = {
    completed: false,
    ...req.body,
    id: uuidV4(),
  };

  todos.push(newTodo);

  res.status(201);
  res.send(newTodo);
});

app.patch("/api/todos/:id", (req, res) => {
  const updateIndex = findIndex(todos, (t) => t.id === req.params.id);

  const oldTodo = todos[updateIndex];

  const newTodo = {
    ...oldTodo,
    ...req.body,
  };

  todos[updateIndex] = newTodo;

  res.send(newTodo);
});

app.delete("/api/todos/:id", (req, res) => {
  todos = todos.filter((t) => t.id !== req.params.id);

  res.status(204);
  res.send();
});

app.listen(PORT);
