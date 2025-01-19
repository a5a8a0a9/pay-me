import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class BillService {
	private listSubject: BehaviorSubject<any[]> = new BehaviorSubject([] as any[]);
	list$ = this.listSubject.asObservable();

	constructor() {}

	patchList(value: any[]) {
		this.listSubject.next(value);
	}

	getList() {
		const billList: any[] = JSON.parse(localStorage.getItem('billList') ?? JSON.stringify([]));
		return billList;
	}

	setList(request: any) {
		localStorage.setItem('billList', JSON.stringify(request));
	}

	create(request: any) {
		const list: any[] = this.getList();
		list.push(request);
		this.setList(list);
		this.patchList(list);
	}

	update(request: any) {
		const list: any[] = this.getList();
		const updateIndex = list.findIndex(item => item.id === request.id);
		list.splice(updateIndex, 1, request);
		this.setList(list);
		this.patchList(list);
	}

	delete(request: any) {
		const list: any[] = this.getList();
		const deleteIndex = list.findIndex(item => item.id === request.id);
		list.splice(deleteIndex, 1);
		this.setList(list);
		this.patchList(list);
	}
}
