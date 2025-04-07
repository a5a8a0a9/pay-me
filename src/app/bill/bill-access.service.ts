import { Injectable } from '@angular/core';
import { Bill, BillEdit, Expense } from '@model';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class BillAccessService {
	private readonly keys = {
		bills: 'bills',
		expenses: 'expenses',
	};

	constructor() {}

	getBillList(): Observable<Bill[]> {
		return of([]);
	}

	getBill(id: string): Observable<Bill | null> {
		return of(null);
	}

	createBill(request: BillEdit) {}

	deleteBill(id: string) {}

	getExpenseList(billId: string): Observable<Expense[]> {
		return of([]);
	}
}
