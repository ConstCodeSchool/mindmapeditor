import Canvas from "./Canvas.js";
import Drawable, { IDrawable } from "./Drawable.js";

export type Color = string;
export type Coordinat = number;

interface INodule extends Omit<IDrawable, "draw"> {
	textContent: string;
	bordered: boolean;
	borderColor: Color;

	draw: (canvas: Canvas) => void;
}

class Nodule extends Drawable implements INodule {
	textContent = "";

	bordered = true;
	borderColor = "black";

	constructor(textContent: string, x?: number, y?: number) {
		super();

		if (textContent) {
			this.textContent = textContent;
		}

		if (x !== undefined) {
			this.x = x;
		}

		if (y !== undefined) {
			this.y = y;
		}
	}

	// Todo
	// @ts-ignore
	draw(canvas: Canvas) {
		const { context } = canvas;

		context.beginPath();
		context.font = "48px serif";
		context.fillText(this.textContent, this.x, this.y);
	}
}

export default Nodule;
