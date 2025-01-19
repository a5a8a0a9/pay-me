import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'bill',
		loadChildren: () => import('./bill/bill.module').then(m => m.BillModule),
	},
	{
		path: 'user',
		loadChildren: () => import('./user/user.module').then(m => m.UserModule),
	},
	{
		path: '',
		redirectTo: 'bill',
		pathMatch: 'full',
	},
	{
		path: '**',
		redirectTo: 'bill',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
