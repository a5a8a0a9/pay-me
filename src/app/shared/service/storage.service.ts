import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	constructor() {}

	setItem<T>(key: string, value: T): Observable<void> {
		try {
			localStorage.setItem(key, JSON.stringify(value));
			return of(undefined);
		} catch (error) {
			return throwError(() => new Error(`Failed to set item: ${error}`));
		}
	}

	getItem<T>(key: string): Observable<T | null> {
		try {
			const item = localStorage.getItem(key);
			return of(item ? (JSON.parse(item) as T) : null);
		} catch (error) {
			return throwError(() => new Error(`Failed to get item: ${error}`));
		}
	}

	removeItem(key: string): Observable<void> {
		try {
			localStorage.removeItem(key);
			return of(undefined);
		} catch (error) {
			return throwError(() => new Error(`Failed to remove item: ${error}`));
		}
	}
}
