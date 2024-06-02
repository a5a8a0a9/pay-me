import { Injectable } from '@angular/core';
import { Group, User } from '@shared/interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private userListSubject: BehaviorSubject<User[]> = new BehaviorSubject([] as User[]);
	userList$ = this.userListSubject.asObservable();

	private groupListSubject: BehaviorSubject<Group[]> = new BehaviorSubject([] as User[]);
	groupList$ = this.groupListSubject.asObservable();

	constructor() {}

	patchUserList(value: any[]) {
		this.userListSubject.next(value);
	}

	getUserList() {
		const userList: any[] = JSON.parse(localStorage.getItem('userList') ?? JSON.stringify([]));
		return userList;
	}

	setUserList(request: any) {
		localStorage.setItem('userList', JSON.stringify(request));
	}

	createUser(request: User[]) {
		const oriList: User[] = this.getUserList();

		const list = oriList.concat(request);
		this.setUserList(list);
		this.patchUserList(list);
	}

	updateUser(request: User) {
		const list: User[] = this.getUserList();
		const updateIndex = list.findIndex(item => item.id === request.id);
		list.splice(updateIndex, 1, request);
		this.setUserList(list);
		this.patchUserList(list);
	}

	deleteUser(request: User) {
		const list: User[] = this.getUserList();
		const deleteIndex = list.findIndex(item => item.id === request.id);
		list.splice(deleteIndex, 1);
		this.setUserList(list);
		this.patchUserList(list);
	}
}
