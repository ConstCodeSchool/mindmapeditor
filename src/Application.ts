import Canvas from "./Canvas.js";
import Nodule from "./Nodule.js";

interface IApplication {
	root: HTMLDivElement;
	background: Canvas;
	frontground: Canvas;

	offsetX: number;
	offsetY: number;

	draw: (node: Nodule) => void;
}

class Application implements IApplication {
	root = document.createElement("div");
	background = new Canvas();
	frontground = new Canvas();

	offsetX = 0;
	offsetY = 0;

	constructor(root: HTMLDivElement) {
		this.root = root;
		this.root.append(this.background.element, this.frontground.element);
		this.offsetX = window.innerWidth / 2;
		this.offsetY = window.innerHeight / 2;
	}

	draw(node: Nodule) {
		this.frontground.context.save();
		this.frontground.context.translate(this.offsetX, this.offsetY);

		node.draw(this.frontground);

		this.frontground.context.restore();
	}
}

export default Application;
