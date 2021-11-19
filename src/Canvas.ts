interface ICanvas {
	element: HTMLCanvasElement;
	context: CanvasRenderingContext2D;

	resize: () => void;
	clear: () => void;
}

class Canvas implements ICanvas {
	element = document.createElement("canvas");
	context = this.element.getContext("2d") as CanvasRenderingContext2D;

	resize() {
		this.element.width = window.innerWidth;
		this.element.height = window.innerHeight;
	}

	clear() {
		this.element.width |= 0;
	}
}

export default Canvas;
