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
	selector: 'yo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'pay-me';
	list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
		this.addItem();
	}

	addItem() {
		const itemForm = this.fb.group({
			user: new FormControl('', [Validators.required]),
			item: new FormControl(null, [Validators.required]),
			money: new FormControl('', [Validators.required, Validators.min(0)]),
		});
		this.listForm.push(itemForm);
	}

	removeItem(index: number) {
		this.listForm.removeAt(index);
	}

	reset() {
		console.log(this.form.value);
		this.form.reset({
			name: '',
			memo: '',
		});
		this.listForm.clear();
		this.addItem();
	}
	onSubmit() {
		this.form.markAsDirty();
		this.form.markAllAsTouched();
	}

	onCreateOpen(modalContent: any) {
		this.modalService.open(modalContent, {
			centered: true,
			scrollable: true,
			size: 'lg',
		});
	}
}
