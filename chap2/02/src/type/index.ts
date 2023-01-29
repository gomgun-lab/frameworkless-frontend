export type Todo = { text: string; completed: boolean };
export type State = { todos: Todo[]; currentFilter: Filters };
export type Filters = "All" | "Active" | "Completed";
