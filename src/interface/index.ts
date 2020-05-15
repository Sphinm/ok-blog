export interface ITodoItem {
  id: string;
  description: string;
  completed: boolean;
}

export interface IHeaderProps {
  onAddTodo?: (event: Svelte.KeyboardEvent<HTMLInputElement>) => void;
}

export interface IAddTodoInfo {
  value: string;
}

export interface IFilterProps {
  filter: FilterName;
}

export type TodoItems = Array<ITodoItem>;
export type FilterName = "all" | "active" | "completed";
