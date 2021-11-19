type Subscriber = (render: Render) => void;
type Unsubscribe = () => void;
type Timestamp = number;

export interface IRender {
	subscribers: Subscriber[];

	timestamp: Timestamp;
	pTimestamp: Timestamp;
	diffTimestamp: Timestamp;
	fps: number;

	tick: (timestamp: Timestamp) => void;

	subscribe: (subscriber: Subscriber) => Unsubscribe;
}

class Render implements IRender {
	subscribers = [] as Subscriber[];

	timestamp = 0;
	pTimestamp = 0;
	diffTimestamp = 0;
	fps = 0;

	constructor() {
		requestAnimationFrame((timestamp: Timestamp) => this.tick(timestamp));
	}

	tick(timestamp: Timestamp) {
		requestAnimationFrame((timestamp: Timestamp) => this.tick(timestamp));

		this.diffTimestamp = timestamp - this.timestamp;
		this.pTimestamp = this.timestamp;
		this.timestamp = timestamp;
		this.fps = 1000 / this.diffTimestamp;

		for (const subscriber of this.subscribers) {
			subscriber(this);
		}
	}

	subscribe(subscriber: Subscriber) {
		if (!this.subscribers.includes(subscriber)) {
			this.subscribers.push(subscriber);
		}

		return () => {
			const index = this.subscribers.indexOf(subscriber);

			if (index === -1) {
				this.subscribers.splice(index, 1);
			}
		};
	}
}

export default Render;
