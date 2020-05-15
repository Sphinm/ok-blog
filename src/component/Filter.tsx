import { IFilterProps } from "../interface/index";
import { CurrentStatus } from "../enum/index";

export default function Filter(props: IFilterProps) {
  const { filter } = props;

  <ul class="filters">
    <li>
      <a class={filter === CurrentStatus.ALL ? "selected" : ""} href="#/">
        All
      </a>
    </li>
    <li>
      <a class={filter === CurrentStatus.ACTIVE ? "selected" : ""} href="#/active">
        Active
      </a>
    </li>
    <li>
      <a class={filter === CurrentStatus.COMPLETED ? "selected" : ""} href="#/completed">
        Completed
      </a>
    </li>
  </ul>;
}
