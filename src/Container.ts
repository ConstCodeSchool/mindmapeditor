import Drawable from "./Drawable.js";

type Callback = (element: Drawable, index: number, list: Drawable[]) => void;

export interface IContainer {
	elements: Drawable[];

	add: (...drawables: Drawable[]) => void;
	remove: (...drawables: Drawable[]) => void;
	forEach: (callback: Callback) => void;
}

export default class Container implements IContainer {
	elements = [] as Drawable[];

	add(...drawables: Drawable[]) {
		for (const drawable of drawables) {
			if (!this.elements.includes(drawable)) {
				this.elements.push(drawable);
			}
		}
	}

	remove(...drawables: Drawable[]) {
		this.elements = this.elements.filter(
			(element) => !drawables.includes(element)
		);
	}

	forEach(callback: Callback) {
		this.elements.forEach(callback);
	}
}
