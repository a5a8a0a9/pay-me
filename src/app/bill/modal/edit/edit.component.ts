import { Component, OnInit } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BillService } from '../../bill.service';
import * as moment from 'moment';

@Component({
	selector: 'yo-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
	form: FormGroup = this.fb.group({
		name: new FormControl('', [Validators.required]),
		memo: new FormControl('', []),
		list: this.fb.array([]),
	});

	get listForm(): FormArray {
		return this.form.get('list') as FormArray;
	}

	get totalMoney() {
		return this.form.value.list.reduce((total: number, item: any) => {
			return total + item.money;
		}, 0);
	}

	get userCount() {
		return Array.from(
			new Set(this.form.value.list.map((item: any) => item.user))
		).length;
	}

	constructor(
		public activeModal: NgbActiveModal,
		private billService: BillService,
		private fb: FormBuilder
	) {}

	ngOnInit() {
		this.addPayment();
	}

	addPayment() {
		const itemForm = this.fb.group({
			user: new FormControl('', [Validators.required]),
			item: new FormControl(null, [Validators.required]),
			money: new FormControl('', [Validators.required, Validators.min(0)]),
		});
		this.listForm.push(itemForm);
	}

	removePayment(index: number) {
		this.listForm.removeAt(index);
	}

	reset() {
		this.form.reset({
			name: '',
			memo: '',
		});
		this.listForm.clear();
		this.addPayment();
	}
	onSubmit() {
		this.form.markAsDirty();
		this.form.markAllAsTouched();
		const request = {
			...this.form.value,
			totalMoney: this.totalMoney,
			userCount: this.userCount,
			id: moment().format('x'),
		};
		this.billService.create(request);
		this.activeModal.close();
	}
}
