import { Routes } from '@angular/router';
import { BillDetailComponent, BillListComponent } from '@feature/bill';

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
