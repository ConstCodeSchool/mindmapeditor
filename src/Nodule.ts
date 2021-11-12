import Canvas from "./Canvas";

export type Color = string;
export type Coordinat = number;

interface INodule {
	textContent: string;
	x: Coordinat;
	y: Coordinat;
	bordered: boolean;
	borderColor: Color;

	draw: (canvas: Canvas) => void;
}

class Nodule implements INodule {
	textContent = "";
	x = 0;
	y = 0;
	bordered = true;
	borderColor = "black";

	constructor(textContent: string) {
		if (textContent) {
			this.textContent = textContent;
		}
	}

	draw(canvas: Canvas) {
		const { context } = canvas;

		context.beginPath();
		context.strokeText(this.textContent, this.x, this.y);
	}
}

export default Nodule;
