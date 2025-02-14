import { inject, Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root',
})
export class AccessService {
	firestore: Firestore = inject(Firestore);
	googleAuthProvider = new GoogleAuthProvider();

	constructor() {}

	async getList() {
		const users = collection(this.firestore, 'users');

		collectionData(users).subscribe(res => {
			console.log(res);
		});
	}

	async add() {
		const user = await addDoc(collection(this.firestore, 'users'), {
			name: 'hehe',
		});
		console.log(user);
	}
}
