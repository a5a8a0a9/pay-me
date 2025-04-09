import { Injectable } from '@angular/core';
import { BillDetail } from '@shared/model';
import { StorageService } from '@shared/service';
import { map, Observable } from 'rxjs';

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

	createBill(request: BillDetail) {
		return this.storageService.getItem<BillDetail[]>(this.KEY_MAP.billList).pipe(
			map(billList => {
				if (!billList) {
					billList = [];
				}
				billList.push(request);
				return billList;
			}),
			map(billList => this.storageService.setItem<BillDetail[]>(this.KEY_MAP.billList, billList))
		);
	}

	updateBill(request: BillDetail) {
		return this.storageService.getItem<BillDetail[]>(this.KEY_MAP.billList).pipe(
			map(billList => {
				if (!billList) {
					billList = [];
				}
				const index = billList.findIndex(bill => bill.id === request.id);
				if (index !== -1) {
					billList[index] = request;
				}
				return billList;
			}),
			map(billList => this.storageService.setItem<BillDetail[]>(this.KEY_MAP.billList, billList))
		);
	}

	deleteBill(id: string) {
		return this.storageService.getItem<BillDetail[]>(this.KEY_MAP.billList).pipe(
			map(billList => {
				if (!billList) {
					return [];
				}
				const index = billList.findIndex(bill => bill.id === id);
				if (index !== -1) {
					billList.splice(index, 1);
				}
				return billList;
			}),
			map(billList => this.storageService.setItem<BillDetail[]>(this.KEY_MAP.billList, billList))
		);
	}

	deleteExpense(billId: string, expenseId: string) {
		return this.getBillList().pipe(
			map(billList => {
				if (!billList) {
					return [];
				}
				const billIndex = billList.findIndex(bill => bill.id === billId);
				if (billIndex !== -1) {
					const expenseIndex = billList[billIndex].expenseList.findIndex(
						expense => expense.id === expenseId
					);
					if (expenseIndex !== -1) {
						billList[billIndex].expenseList.splice(expenseIndex, 1);
					}
				}
				return billList;
			}),
			map(billList => this.storageService.setItem<BillDetail[]>(this.KEY_MAP.billList, billList))
		);
	}
}
