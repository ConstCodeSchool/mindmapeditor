import Application from "./Application.js";
import Nodule from "./Nodule.js";

const app = new Application(document.querySelector("#app") as HTMLDivElement);

app.add(
	new Nodule("Вот какой-то текст", 100, 100),
	new Nodule("Вот какой-то текст", -100, -100),
	new Nodule("Вот какой-то текст")
);
