import { inject, Injectable } from '@angular/core';
import {
	addDoc,
	collection,
	collectionData,
	deleteDoc,
	doc,
	docData,
	Firestore,
} from '@angular/fire/firestore';
import { catchError, Observable, of, take } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class FirestoreDocService {
	private _firestore: Firestore = inject(Firestore);

	constructor() {}

	getDocList(pathList: string[]): Observable<any[]> {
		const [path, ...pathSegment] = pathList;
		const collectionRef = collection(this._firestore, path, ...pathSegment);

		return collectionData(collectionRef, { idField: 'id' }).pipe(
			take(1),
			catchError(error => {
				return of([]);
			})
		);
	}

	getDoc(pathList: string[], id: string): Observable<any> {
		const [path, ...pathSegment] = pathList;
		const docRef = doc(this._firestore, path, ...pathSegment, id);

		return docData(docRef, { idField: 'id' }).pipe(
			take(1),
			catchError(error => {
				return of(null);
			})
		);
	}

	createDoc(pathList: string[], data: any): Promise<any> {
		const [path, ...pathSegment] = pathList;
		const collectionRef = collection(this._firestore, path, ...pathSegment);

		return addDoc(collectionRef, data);
	}

	deleteDoc(pathList: string[], id: string): Promise<void> {
		const [path, ...pathSegment] = pathList;
		const docRef = doc(this._firestore, path, ...pathSegment, id);

		return deleteDoc(docRef);
	}
}
