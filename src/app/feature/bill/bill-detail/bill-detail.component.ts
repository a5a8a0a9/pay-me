import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { forkJoin } from 'rxjs';
import { BillAccessService } from '../bill-access.service';
import { Bill, Expense, Settlement } from '../bill.model';
import { BillService } from '../bill.service';

@Component({
	selector: 'yo-bill-detail',
	imports: [Button, RouterLink, DatePipe, Card, Tabs, Tab, TabList, TabPanel, TabPanels],
	templateUrl: './bill-detail.component.html',
	styleUrl: './bill-detail.component.scss',
})
export class BillDetailComponent implements OnInit {
	billId: string = '';

	bill: Bill | null = null;
	expenses: Expense[] = [];
	settlements: Settlement[] = [];

	constructor(
		private billService: BillService,
		private activatedRoute: ActivatedRoute,
		private billAccessService: BillAccessService
	) {}

	ngOnInit(): void {
		this.billId = this.activatedRoute.snapshot.params.id;

		forkJoin([
			this.billAccessService.getBill(this.billId),
			this.billAccessService.getExpenseList(this.billId),
		]).subscribe(([bill, expenses]) => {
			console.log(bill);
			console.log(expenses);

			if (!!bill) {
				this.bill = bill;
			}

			this.expenses = expenses;

			this.settlements = this.billService.getSettlements(bill, expenses);
			console.log(this.settlements);
		});
	}
}
