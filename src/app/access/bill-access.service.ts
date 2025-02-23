import { Injectable } from '@angular/core';
import { BillEdit } from '@model';
import { FirestoreDocService } from '@service';

@Injectable({
	providedIn: 'root',
})
export class BillAccessService {
	private readonly keys = {
		bills: 'bills',
		expenses: 'expenses',
	};

	constructor(private firestoreDocService: FirestoreDocService) {}

	getBillList() {
		return this.firestoreDocService.getDocList([this.keys.bills]);
	}

	getBill(id: string) {
		return this.firestoreDocService.getDoc([this.keys.bills], id);
	}

	createBill(request: BillEdit) {
		return this.firestoreDocService.createDoc([this.keys.bills], request);
	}

	deleteBill(id: string) {
		return this.firestoreDocService.deleteDoc([this.keys.bills], id);
	}

	getExpenseList(billId: string) {
		return this.firestoreDocService.getDocList([this.keys.bills, billId, this.keys.expenses]);
	}
}
