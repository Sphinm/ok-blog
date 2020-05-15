import Header, { IAddTodoInfo } from "./component/Header";
import Filter from "./component/Filter";

export interface ITodoItem {
  id: string;
  description: string;
  completed: boolean;
}

export type TodoItems = Array<ITodoItem>;
export type FilterName = "all" | "active" | "completed";

function TrackChange(
  items: TodoItems,
  filtered: TodoItems,
  currentFilter: FilterName,
  numActive: number,
  numCompleted: number
) {
  filtered =
    currentFilter === "all"
      ? items
      : currentFilter === "completed"
      ? items.filter((item) => item.completed)
      : items.filter((item) => !item.completed);

  numActive = items.filter((item) => !item.completed).length;
  numCompleted = items.filter((item) => item.completed).length;
  localStorage.setItem("todos-svelte", JSON.stringify(items));
}

function Routing(currentFilter: FilterName) {
  window.addEventListener("hashchange", () => {
    currentFilter = "all";
    if (window.location.hash === "#/active") {
      currentFilter = "active";
    } else if (window.location.hash === "#/completed") {
      currentFilter = "completed";
    }
  });
}

export default function App() {
  let items: TodoItems = JSON.parse(localStorage.getItem("todo-svelte")) || [];
  let editing: number;
  let currentFilter: FilterName = "all";
  let filtered: TodoItems = [];
  let numActive: number;
  let numCompleted: number;

  //@ts-ignore
  <TrackChange />;

  const ENTER_KEY = 13;
  const ESCAPE_KEY = 27;

  function addTodo(event: Svelte.KeyboardEvent<HTMLInputElement> & { detail: IAddTodoInfo }) {
    items = items.concat({
      id: uuid(),
      description: event.detail.value,
      completed: false,
    });
  }

  function remove(index: number) {
    items = items.slice(0, index).concat(items.slice(index + 1));
  }

  function handleEdit(event: Svelte.KeyboardEvent<HTMLInputElement> & { target: { blur: () => void } }) {
    if (event.which === ENTER_KEY) event.target.blur();
    else if (event.which === ESCAPE_KEY) editing = null;
  }

  function submit(event: Svelte.FocusEvent<HTMLInputElement>) {
    items[editing].description = event.target.value;
    editing = null;
  }

  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function clearCompleted() {
    items = items.filter((item) => !item.completed);
  }

  function toggleAll(event: Svelte.ChangeEvent<HTMLInputElement>) {
    items = items.map((item) => ({
      id: item.id,
      description: item.description,
      completed: event.target.checked,
    }));
  }

  //@ts-ignore
  <Routing />;

  <section class="todoapp">
    <Header onAddTodo={addTodo} />
    <if condition={items.length > 0}>
      <section class="main">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          onChange={toggleAll}
          checked={numCompleted === items.length}
        />
        <label for="toggle-all">Mark all as complete</label>

        <ul class="todo-list">
          <each from={filtered}>
            {(item: ITodoItem, index: number, key: string = item.id) => (
              <li class={`${item.completed ? "completed" : ""} ${editing === index ? "editing" : ""}`}>
                <div class="view">
                  <input class="toggle" type="checkbox" bindChecked={item.completed} />
                  <label onDoubleClick={() => (editing = index)}>{item.description}</label>
                  <button onClick={() => remove(index)} class="destroy" />
                </div>

                <if condition={editing === index}>
                  <input value={item.description} id="edit" class="edit" onKeyDown={handleEdit} onBlur={submit} />
                </if>
              </li>
            )}
          </each>
        </ul>

        <footer class="footer">
          <span class="todo-count">
            <strong>{numActive}</strong>
            {numActive === 1 ? "item" : "items"} left
          </span>

          <Filter filter={currentFilter} />

          <if condition={numCompleted}>
            <button class="clear-completed" onClick={clearCompleted}>
              Clear completed
            </button>
          </if>
        </footer>
      </section>
    </if>
  </section>;
}
