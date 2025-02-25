import { Routes } from '@angular/router';
import { BillListComponent } from '@bill/bill-list/bill-list.component';

export const routes: Routes = [
	{
		path: 'bill',
		component: BillListComponent,
	},
	{
		path: '',
		redirectTo: 'bill',
		pathMatch: 'full',
	},
];
