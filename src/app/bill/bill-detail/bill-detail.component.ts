import { AccessService } from '@access';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
	selector: 'yo-bill-detail',
	imports: [Button, RouterLink],
	templateUrl: './bill-detail.component.html',
	styleUrl: './bill-detail.component.scss',
})
export class BillDetailComponent implements OnInit {
	id: string = '';
	constructor(
		private activatedRoute: ActivatedRoute,
		private accessService: AccessService
	) {}

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params.id;
		this.accessService.bill.getBill(this.id).subscribe((response: any) => {
			console.log(response);
		});
	}
}
