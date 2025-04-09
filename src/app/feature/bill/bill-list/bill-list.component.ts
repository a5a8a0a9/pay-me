import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DialogControl } from '@shared/class';
import { BillDetail } from '@shared/model';
import { ConfirmService } from '@shared/service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BillAccessService } from '../bill-access.service';
import { BillEditComponent } from '../bill-edit/bill-edit.component';

@Component({
	selector: 'yo-bill-list',
	imports: [DatePipe, CardModule, ButtonModule, BillEditComponent, RouterLink],
	templateUrl: './bill-list.component.html',
	styleUrl: './bill-list.component.scss',
})
export class BillListComponent implements OnInit {
	billList: BillDetail[] = [];

	billEditCtrl = new DialogControl<{ billId: string; isEdit: boolean } | null>();

	constructor(
		private confirmService: ConfirmService,
		private billAccessService: BillAccessService
	) {}

	ngOnInit(): void {
		this.getBillList();
	}

	getBillList() {
		this.billList = [];

		this.billAccessService.getBillList().subscribe({
			next: billList => {
				this.billList = billList || [];
			},
			error: err => {
				console.log(err);
			},
		});
	}

	async deleteBill(bill: BillDetail) {
		this.confirmService.confirm({
			type: 'delete',
			option: {
				message: `確定要刪除「${bill.name}」嗎?`,
				accept: async () => {
					try {
						this.billAccessService.deleteBill(bill.id).subscribe({
							next: () => {
								this.getBillList();
							},
							error: err => {
								console.log(err);
							},
						});
					} catch (e) {
						console.log(e);
					}
				},
			},
		});
	}
}
