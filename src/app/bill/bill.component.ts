import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillService } from './bill.service';
import { EditComponent } from './modal/edit/edit.component';

@Component({
	selector: 'yo-bill',
	templateUrl: './bill.component.html',
	styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
	billList$ = this.billService.list$;
	constructor(
		private modalService: NgbModal,
		private billService: BillService
	) {}

	ngOnInit() {
		const list = this.billService.getList();
		this.billService.patchList(list);
	}

	deleteBill(bill: any) {
		this.billService.delete(bill);
	}

	onCreateOpen() {
		this.modalService.open(EditComponent, {
			centered: true,
			scrollable: true,
			size: 'lg',
		});
	}
}
