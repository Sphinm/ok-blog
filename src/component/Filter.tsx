import { FilterName } from "../App";

export interface IFilterProps {
  filter: FilterName;
}

export default function Filter(props: IFilterProps) {
  const { filter } = props;

  <ul class="filters">
    <li>
      <a class={filter === "all" ? "selected" : ""} href="#/">
        All
      </a>
    </li>
    <li>
      <a class={filter === "active" ? "selected" : ""} href="#/active">
        Active
      </a>
    </li>
    <li>
      <a class={filter === "completed" ? "selected" : ""} href="#/completed">
        Completed
      </a>
    </li>
  </ul>;
}
