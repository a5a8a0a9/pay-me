import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { BillRoutingModule } from './bill-routing.module';
import { BillComponent } from './bill.component';
import { DetailComponent } from './modal/detail/detail.component';
import { EditComponent } from './modal/edit/edit.component';

@NgModule({
	declarations: [BillComponent, EditComponent, DetailComponent],
	imports: [SharedModule, BillRoutingModule]
})
export class BillModule {}
