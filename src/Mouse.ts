export interface IMouse {
	element: HTMLElement;

	clientX: number;
	clientY: number;

	under: boolean;
	changed: boolean;

	left: boolean;
	pleft: boolean;

	readonly click: boolean;

	update: (e: MouseEvent, under: boolean) => void;
}

const LEFT_BUTTON_MASK: number = 1;

class Mouse implements IMouse {
	element = document.createElement("div") as HTMLElement;

	clientX = 0;
	pclientX = 0;
	dx = 0;

	clientY = 0;
	pclientY = 0;
	dy = 0;

	wheel = 0;
	pwheel = 0;
	dwheel = 0;

	under = false;
	changed = false;

	left = false;
	pleft = false;

	constructor(element: HTMLElement) {
		this.element = element;

		this.element.addEventListener("mousemove", (e) => this.update(e, true));

		this.element.addEventListener("mouseleave", (e) =>
			this.update(e, false)
		);

		this.element.addEventListener("mouseenter", (e) =>
			this.update(e, true)
		);

		this.element.addEventListener("mousedown", (event: MouseEvent) => {
			if (event.buttons & LEFT_BUTTON_MASK && !this.left) {
				this.left = true;
				this.changed = true;
			}
		});

		this.element.addEventListener("mouseup", (event: MouseEvent) => {
			if (!(event.buttons & LEFT_BUTTON_MASK) && this.left) {
				this.left = false;
				this.changed = true;
			}
		});

		this.element.addEventListener("wheel", (event: WheelEvent) => {
			this.wheel += event.deltaY;
			this.dwheel = this.wheel - this.pwheel;
			this.changed = true;
		});
	}

	get click() {
		return !this.left && this.pleft;
	}

	update(e: MouseEvent, under: boolean) {
		const { clientX, clientY } = e;

		Object.assign(this, {
			clientX,
			clientY,
			under,
			dx: clientX - this.pclientX,
			dy: clientY - this.pclientY,
			changed: true,
		});
	}

	done() {
		if (this.changed) {
			this.changed = false;
			this.pleft = this.left;
			this.pclientX = this.clientX;
			this.pclientY = this.clientY;
			this.dx = 0;
			this.dy = 0;
			this.pwheel = this.wheel;
			this.dwheel = 0;
		}
	}
}

export default Mouse;
