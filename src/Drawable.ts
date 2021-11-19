export interface IDrawable {
	x: number;
	y: number;
	visible: boolean;

	draw: (...args: any) => void;
}

export default class Drawable implements IDrawable {
	x = 0;
	y = 0;
	visible = true;

	draw(...args: any) {}
}
