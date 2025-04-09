import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DialogControl } from '@shared/class';
import { Bill, BillDetail, Expense } from '@shared/model';
import { ConfirmService } from '@shared/service';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { BillAccessService } from '../bill-access.service';
import { BillExpenseEditComponent } from '../bill-expense-edit/bill-expense-edit.component';

@Component({
	selector: 'yo-bill-detail',
	imports: [
		Button,
		RouterLink,
		DatePipe,
		Card,
		Tabs,
		Tab,
		TabList,
		TabPanel,
		TabPanels,
		BillExpenseEditComponent,
	],
	templateUrl: './bill-detail.component.html',
	styleUrl: './bill-detail.component.scss',
})
export class BillDetailComponent implements OnInit {
	billId: string = '';

	bill: BillDetail | null = null;

	userDict: Record<string, string> = {};

	billExpenseEditCtrl = new DialogControl<{ billId: string; expenseId: string; isEdit: boolean }>();

	constructor(
		private activatedRoute: ActivatedRoute,
		private billAccessService: BillAccessService,
		private confirmService: ConfirmService
	) {}

	ngOnInit(): void {
		this.billId = this.activatedRoute.snapshot.params.id;

		this.getBillDetail(this.billId);
	}

	getBillDetail(billId: string) {
		this.billAccessService.getBill(billId).subscribe({
			next: bill => {
				if (!bill) {
					return;
				}

				this.bill = bill;

				this.userDict = bill.userList.reduce((acc: Record<string, string>, user) => {
					acc[user.id] = user.name;
					return acc;
				}, {});
			},
			error: err => {
				console.log(err);
			},
		});
	}

	deleteExpense(bill: Bill, expense: Expense) {
		this.confirmService.confirm({
			type: 'delete',
			option: {
				message: `確定要刪除「${expense.name}」嗎?`,
				accept: async () => {
					try {
						this.billAccessService.deleteExpense(bill.id, expense.id).subscribe({
							next: () => {
								this.getBillDetail(this.billId);
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
