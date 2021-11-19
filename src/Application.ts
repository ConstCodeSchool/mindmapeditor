import Canvas from "./Canvas.js";
import Nodule from "./Nodule.js";
import Mouse from "./Mouse.js";
import Render from "./Render.js";
import Container, { IContainer } from "./Container.js";
import Drawable from "./Drawable.js";

type Sign = -1 | 0 | 1;

enum Mode {
	VIEW = "view",
	TRANSLATE = "translate",
	SCALE = "scale",
}

interface IApplication extends Pick<IContainer, "add" | "remove"> {
	root: HTMLDivElement;
	background: Canvas;
	frontground: Canvas;
	offsetX: number;
	offsetY: number;
	scale: number;
	mouse: Mouse;
	render: Render;
	mode: Mode;
	container: Container;
	drawed: boolean;

	draw: (node: Nodule) => void;
	tick: () => void;
}

class Application implements IApplication {
	root = document.createElement("div");
	background = new Canvas();
	frontground = new Canvas();
	offsetX = 0;
	offsetY = 0;
	drawed = false;
	scale = 1;
	mode = Mode.VIEW;
	mouse = new Mouse(this.root);
	render = new Render();
	container = new Container();

	constructor(root: HTMLDivElement) {
		this.root = root;
		this.root.append(this.background.element, this.frontground.element);
		this.mouse = new Mouse(this.root);

		this.offsetX = window.innerWidth / 2;
		this.offsetY = window.innerHeight / 2;

		this.render.subscribe(() => this.tick());

		window.addEventListener("resize", () => this.resizeHandler());
		this.resizeHandler();
	}

	resizeHandler() {
		this.drawed = true;
		this.background.resize();
		this.frontground.resize();
	}

	draw() {
		this.frontground.clear();
		this.background.clear();

		this.frontground.context.save();
		this.frontground.context.translate(this.offsetX, this.offsetY);
		this.frontground.context.scale(this.scale, this.scale);

		this.container.forEach((element: Drawable) =>
			element.draw(this.frontground)
		);

		this.frontground.context.restore();
	}

	tick() {
		if (!this.mouse.changed) {
			return;
		}

		if (this.mouse.left && !this.mouse.pleft && this.mode === Mode.VIEW) {
			this.mode = Mode.TRANSLATE;
			this.drawed = true;
		}

		if (!this.mouse.left && this.mode === Mode.TRANSLATE) {
			this.mode = Mode.VIEW;
			this.drawed = true;
		}

		if (this.mouse.dwheel) {
			const step: number = this.mouse.dwheel / 530;
			const pscale: number = this.scale;
			this.scale += step;

			const sign: Sign = step > 0 ? 1 : step < 0 ? -1 : 0;

			if (this.scale < 0.1) {
				this.scale = 0.1;
			}

			if (this.scale >= 5) {
				this.scale = 5;
			}

			// this.offsetX -=
			// 	(this.offsetX - this.mouse.clientX) * pscale -
			// 	(this.offsetX - this.mouse.clientX) * this.scale;
			// this.offsetY +=
			// 	(this.offsetY - this.mouse.clientY) * pscale -
			// 	(this.offsetY - this.mouse.clientY) * this.scale;

			this.drawed = true;
		}

		if (this.mode === Mode.TRANSLATE) {
			this.offsetX += this.mouse.dx;
			this.offsetY += this.mouse.dy;
			this.drawed = true;
		}

		if (this.mouse.click) {
		}

		if (this.drawed) {
			this.draw();
			this.drawed = false;
		}

		this.mouse.done();
	}

	add(...args: Drawable[]) {
		const result = this.container.add(...args);
		this.drawed = true;
		return result;
	}

	remove(...args: Drawable[]) {
		const result = this.container.remove(...args);
		this.drawed = true;
		return result;
	}
}

export default Application;
