//@ts-check
import App from "./App";
import { createRenderFunction } from "svelte-draft/utility";

const render = createRenderFunction(document.body, App);
export default render;
