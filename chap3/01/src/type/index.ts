export type Todo = { text: string; completed: boolean };
export type State = { todos: Todo[]; currentFilter: Filters };
export type Filters = "All" | "Active" | "Completed";

export type ComponentCreator = (
  targetElement: HTMLElement,
  state: State,
  events: any
) => HTMLElement;

export type Registry = {
  [name: string]: ComponentCreator;
};
