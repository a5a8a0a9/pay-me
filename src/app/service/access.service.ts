import { inject, Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import {
	addDoc,
	collection,
	collectionData,
	deleteDoc,
	doc,
	Firestore,
} from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root',
})
export class AccessService {
	firestore: Firestore = inject(Firestore);
	googleAuthProvider = new GoogleAuthProvider();

	constructor() {}

	getDocList(path: string) {
		const clt = collection(this.firestore, path);
		return collectionData(clt, { idField: 'id' });
	}

	createDoc(path: string, data: any) {
		return addDoc(collection(this.firestore, path), data);
	}

	deleteDoc(path: string, id: string) {
		return deleteDoc(doc(this.firestore, path, id));
	}
}
