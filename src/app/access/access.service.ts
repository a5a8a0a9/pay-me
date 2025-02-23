import { Injectable } from '@angular/core';

import { BillAccessService } from './bill-access.service';

@Injectable({
	providedIn: 'root',
})
export class AccessService {
	constructor(public bill: BillAccessService) {}
}
