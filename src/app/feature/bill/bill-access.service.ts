import { Injectable } from '@angular/core';
import { BillDetail } from '@shared/model';
import { StorageService } from '@shared/service';
import { map, Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class BillAccessService {
	private readonly KEY_MAP = {
		bill: 'bill',
		billList: 'billList',
		expense: 'expense',
	};

	constructor(private storageService: StorageService) {}

	getBillList(): Observable<BillDetail[] | null> {
		return this.storageService.getItem<BillDetail[]>(this.KEY_MAP.billList);
	}

	getBill(id: string): Observable<BillDetail | null> {
		return this.storageService
			.getItem<BillDetail[]>(this.KEY_MAP.billList)
			.pipe(map(billList => billList?.find(bill => bill.id === id) || null));
	}

	createBill(request: any) {}

	deleteBill(id: string) {}

	getExpenseList(billId: string): Observable<any[]> {
		return of([]);
	}
}
