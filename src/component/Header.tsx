import { createEventDispatcher } from "svelte";

export interface IHeaderProps {
  onAddTodo?: (event: Svelte.KeyboardEvent<HTMLInputElement>) => void;
}

export interface IAddTodoInfo {
  value: string;
}

export default function Header(props: IHeaderProps) {
  const dispatch = createEventDispatcher();
  const ENTER_KEY = 13;

  function onAddTodo(event: Svelte.KeyboardEvent<HTMLInputElement> & { target: { value: string } }) {
    const todo = event.target.value.toString().trim();
    if (event.which === ENTER_KEY && todo) {
      dispatch("addtodo", { value: todo });
      event.target.value = "";
    }
  }

  <header>
    <h1>Todos</h1>
    <input class="new-todo" onKeyDown={onAddTodo} placeholder="What needs to do done?" />
  </header>;
}
