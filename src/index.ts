import Application from "./Application.js";
import Nodule from "./Nodule.js";

const app = new Application(document.querySelector("#app") as HTMLDivElement);
const node: Nodule = new Nodule("Вот какой-то текст");

app.draw(node);

console.log(app);
