import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DialogControl } from '@shared/class';
import { Bill } from '@shared/model';
import { ConfirmService } from '@shared/service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BillAccessService } from '../bill-access.service';
import { BillCreateComponent } from '../bill-create/bill-create.component';

@Component({
	selector: 'yo-bill-list',
	imports: [DatePipe, CardModule, ButtonModule, RouterLink, BillCreateComponent],
	templateUrl: './bill-list.component.html',
	styleUrl: './bill-list.component.scss',
})
export class BillListComponent {
	billList: Bill[] = [];

	billCreateCtrl = new DialogControl();

	constructor(
		private confirmService: ConfirmService,
		private billAccessService: BillAccessService
	) {}

	async deleteBill(id: string) {
		this.confirmService.confirm({
			type: 'delete',
			option: {
				accept: async () => {
					try {
						await this.billAccessService.deleteBill(id);
					} catch (e) {
						console.log(e);
					}
				},
			},
		});
	}
}
