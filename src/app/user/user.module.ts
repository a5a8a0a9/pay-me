import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { EditComponent } from './modal/edit/edit.component';

@NgModule({
	declarations: [UserComponent, EditComponent],
	imports: [SharedModule, UserRoutingModule],
})
export class UserModule {}
