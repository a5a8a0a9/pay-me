import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'list',
		pathMatch: 'full',
	},
	{
		path: 'list',
		component: UserComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserRoutingModule {}
