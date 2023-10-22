import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './bill.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'list',
		pathMatch: 'full',
	},
	{
		path: 'list',
		component: BillComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BillRoutingModule {}
