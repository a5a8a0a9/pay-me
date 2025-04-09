import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BillDetail, Expense } from '@shared/model';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { BillAccessService } from '../bill-access.service';

@Component({
	selector: 'yo-bill-detail',
	imports: [Button, RouterLink, DatePipe, Card, Tabs, Tab, TabList, TabPanel, TabPanels],
	templateUrl: './bill-detail.component.html',
	styleUrl: './bill-detail.component.scss',
})
export class BillDetailComponent implements OnInit {
	billId: string = '';

	bill: BillDetail | null = null;
	expenses: Expense[] = [];

	constructor(
		private activatedRoute: ActivatedRoute,
		private billAccessService: BillAccessService
	) {}

	ngOnInit(): void {
		this.billId = this.activatedRoute.snapshot.params.id;

		this.getBillDetail(this.billId);
	}

	getBillDetail(billId: string) {
		this.billAccessService.getBill(billId).subscribe({
			next: bill => {
				this.bill = bill;
			},
			error: err => {
				console.log(err);
			},
		});
	}
}
