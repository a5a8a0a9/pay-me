import { AccessService } from '@access';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BillCreateComponent } from '@bill/bill-create/bill-create.component';
import { DialogControl } from '@class';
import { Bill } from '@model';
import { ConfirmService } from '@service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';

@Component({
	selector: 'yo-bill-list',
	imports: [AsyncPipe, DatePipe, CardModule, ButtonModule, RouterLink, BillCreateComponent],
	templateUrl: './bill-list.component.html',
	styleUrl: './bill-list.component.scss',
})
export class BillListComponent {
	bills$: Observable<Bill[]> = this.accessService.bill.getBillList();

	billCreateCtrl = new DialogControl();

	constructor(
		private confirmService: ConfirmService,
		private accessService: AccessService
	) {}

	async deleteBill(id: string) {
		this.confirmService.confirm({
			type: 'delete',
			option: {
				accept: async () => {
					try {
						await this.accessService.bill.deleteBill(id);
					} catch (e) {
						console.log(e);
					}
				},
			},
		});
	}
}
