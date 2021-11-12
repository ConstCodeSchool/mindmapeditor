interface ICanvas {
	element: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
}

class Canvas implements ICanvas {
	element = document.createElement("canvas");
	context = this.element.getContext("2d") as CanvasRenderingContext2D;

	constructor() {
		this.resize();
		window.addEventListener("resize", () => this.resize());
	}

	resize() {
		this.element.width = window.innerWidth;
		this.element.height = window.innerHeight;
	}
}

export default Canvas;
