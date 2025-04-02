import { Routes } from '@angular/router';
import { BillDetailComponent } from '@bill/bill-detail/bill-detail.component';
import { BillListComponent } from '@bill/bill-list/bill-list.component';

export const routes: Routes = [
	{
		path: 'bill',
		component: BillListComponent,
	},
	{
		path: 'bill/:id',
		component: BillDetailComponent,
	},
	{
		path: '',
		redirectTo: 'bill',
		pathMatch: 'full',
	},
];
