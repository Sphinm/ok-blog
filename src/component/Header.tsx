import { createEventDispatcher } from "svelte";
import { IHeaderProps, IAddTodoInfo } from "../interface/index";
import { KeyCodeEnum } from "../enum/index";

export default function Header(props: IHeaderProps) {
  const dispatch = createEventDispatcher();

  function onAddTodo(event: Svelte.KeyboardEvent<HTMLInputElement> & { target: IAddTodoInfo }) {
    const todo = event.target.value.toString().trim();
    if (event.which === KeyCodeEnum.ENTER_KEY && todo) {
      dispatch("addtodo", { value: todo });
      event.target.value = "";
    }
  }

  <header>
    <h1>Todos</h1>
    <input class="new-todo" onKeyDown={onAddTodo} placeholder="What needs to do done?" type="text" />
  </header>;
}
