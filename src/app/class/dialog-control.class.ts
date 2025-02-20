export class DialogControl<T> {
	isShow: boolean = false;
	data: T | null = null;

	constructor() {}

	show(data: any = null) {
		this.data = data;
		this.isShow = true;
	}

	hide() {
		this.isShow = false;
		this.data = null;
	}
}
