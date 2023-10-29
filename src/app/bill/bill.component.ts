import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillService } from './bill.service';
import { EditComponent } from './modal/edit/edit.component';
import { DetailComponent } from './modal/detail/detail.component';
import Swal from 'sweetalert2';

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

	async deleteBill(bill: any) {
		const { isConfirmed } = await Swal.fire({
			title: `確定要刪除${bill.name}?`,
			text: '',
			showCancelButton: true,
			confirmButtonText: '確定',
			cancelButtonText: '取消',
		});
		if (!isConfirmed) return;
		this.billService.delete(bill);
	}

	onCreateOpen() {
		const modalRef = this.modalService.open(EditComponent, {
			centered: true,
			scrollable: true,
			size: 'lg',
			backdrop: 'static',
		});
	}

	onDetailOpen(bill: any) {
		const modalRef = this.modalService.open(DetailComponent, {
			centered: true,
			scrollable: true,
			size: 'lg',
		});
		modalRef.componentInstance.bill = bill;
	}
}
