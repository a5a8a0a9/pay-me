import { Component, OnInit } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'yo-bill',
	templateUrl: './bill.component.html',
	styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
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

	constructor(private fb: FormBuilder, private modalService: NgbModal) {}

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
		console.log(this.form.value);
	}

	onCreateOpen(modalContent: any) {
		this.modalService.open(modalContent, {
			centered: true,
			scrollable: true,
			size: 'lg',
		});
	}
}
