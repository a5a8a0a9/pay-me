import { Injectable } from '@angular/core';
import { BillEdit } from '@model';
import { AccessService } from '@service';

@Injectable({
	providedIn: 'root',
})
export class BillService {
	private readonly keys = {
		bills: 'bills',
		expenses: 'expenses',
	};

	constructor(private accessService: AccessService) {}

	getBillList() {
		return this.accessService.getDocList([this.keys.bills]);
	}

	getBill(id: string) {
		return this.accessService.getDoc([this.keys.bills], id);
	}

	createBill(request: BillEdit) {
		return this.accessService.createDoc([this.keys.bills], request);
	}

	deleteBill(id: string) {
		return this.accessService.deleteDoc([this.keys.bills], id);
	}

	getExpenseList(billId: string) {
		return this.accessService.getDocList([this.keys.bills, billId, this.keys.expenses]);
	}
}
