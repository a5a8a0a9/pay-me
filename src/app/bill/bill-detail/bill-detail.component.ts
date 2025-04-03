import { AccessService } from '@access';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Bill, Expense, Settlement } from '@model';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Tag } from 'primeng/tag';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'yo-bill-detail',
	imports: [
		Button,
		RouterLink,
		DatePipe,
		Card,
		Tag,
		Divider,
		Tabs,
		Tab,
		TabList,
		TabPanel,
		TabPanels,
	],
	templateUrl: './bill-detail.component.html',
	styleUrl: './bill-detail.component.scss',
})
export class BillDetailComponent implements OnInit {
	billId: string = '';

	bill: Bill | null = null;
	expenses: Expense[] = [];
	settlements: Settlement[] = [];

	constructor(
		private activatedRoute: ActivatedRoute,
		private accessService: AccessService
	) {}

	ngOnInit(): void {
		this.billId = this.activatedRoute.snapshot.params.id;

		forkJoin([
			this.accessService.bill.getBill(this.billId),
			this.accessService.bill.getExpenseList(this.billId),
		]).subscribe(([bill, expenses]) => {
			if (!!bill) {
				this.bill = bill;
			}

			this.expenses = expenses;

			this.settlements = this.getSettlements(bill, expenses);
			console.log(this.settlements);
		});
	}

	/**
	 * 計算每個參與者應該支付的金額
	 * @param bill 帳單
	 * @param expenses 花費清單
	 * @returns 最少交易次數的付款清單
	 */
	getSettlements(bill: Bill | null, expenses: Expense[]): Settlement[] {
		if (!bill) {
			return [];
		}

		const balances: { [participant: string]: number } = {};

		// 初始化每個參與者的餘額
		bill.participants.forEach(participant => {
			balances[participant] = 0;
		});

		// 計算每個參與者的餘額
		expenses.forEach(expense => {
			const share = expense.amount / expense.participants.length;

			// 付款人增加餘額
			balances[expense.payer] += expense.amount;

			// 每個參與者減少餘額
			expense.participants.forEach(participant => {
				balances[participant] -= share;
			});
		});

		// 將餘額分為正數（應收款）和負數（應付款）
		const creditors: { participant: string; amount: number }[] = [];
		const debtors: { participant: string; amount: number }[] = [];

		for (const participant in balances) {
			if (balances[participant] > 0) {
				creditors.push({ participant, amount: balances[participant] });
			} else if (balances[participant] < 0) {
				debtors.push({ participant, amount: -balances[participant] });
			}
		}

		// 計算最少交易次數的付款清單
		const settlements: Settlement[] = [];

		while (creditors.length > 0 && debtors.length > 0) {
			const creditor = creditors[0];
			const debtor = debtors[0];

			const settlementAmount = Math.min(creditor.amount, debtor.amount);

			settlements.push({
				from: debtor.participant,
				to: creditor.participant,
				amount: settlementAmount,
			});

			creditor.amount -= settlementAmount;
			debtor.amount -= settlementAmount;

			if (creditor.amount === 0) {
				creditors.shift();
			}

			if (debtor.amount === 0) {
				debtors.shift();
			}
		}

		return settlements;
	}
}
