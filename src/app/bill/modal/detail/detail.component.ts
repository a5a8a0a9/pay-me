import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BillService } from '../../bill.service';

@Component({
	selector: 'yo-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
	@Input() bill: any;

	get avgMoney() {
		return Math.floor(this.bill.totalMoney / this.bill.list.length);
	}

	constructor(public activeModal: NgbActiveModal) {}
}
