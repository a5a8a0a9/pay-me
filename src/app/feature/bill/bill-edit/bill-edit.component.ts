import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { BillDetail, User } from '@shared/model';
import { FormService } from '@shared/service';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { iif, switchMap } from 'rxjs';
import { BillAccessService } from '../bill-access.service';

@Component({
	selector: 'yo-bill-edit',
	imports: [Dialog, Button, InputText, Textarea, ReactiveFormsModule],
	templateUrl: './bill-edit.component.html',
	styleUrl: './bill-edit.component.scss',
})
export class BillEditComponent implements OnInit {
	@Input() data: { billId: string; isEdit: boolean } | null = null;

	@Output() hide = new EventEmitter();
	@Output() refresh = new EventEmitter();

	visible: true = true;

	bill: BillDetail | null = null;

	form = this.formBuilder.group<{
		name: FormControl<string | null>;
		memo: FormControl<string | null>;
		userList: FormArray<
			FormGroup<{
				id: FormControl<string | null>;
				name: FormControl<string | null>;
			}>
		>;
	}>({
		name: new FormControl(null, Validators.required),
		memo: new FormControl(null),
		userList: this.formBuilder.array<
			FormGroup<{
				id: FormControl<string | null>;
				name: FormControl<string | null>;
			}>
		>([], Validators.required),
	});

	get userFormList(): FormArray {
		return this.form.get('userList') as FormArray;
	}

	constructor(
		private formBuilder: FormBuilder,
		private formService: FormService,
		private billAccessService: BillAccessService,
		private messageService: MessageService
	) {}

	ngOnInit(): void {
		if (this.data?.isEdit) {
			this.getData(this.data.billId);
		} else {
			this.addUser();
		}
	}

	getData(billId: string) {
		this.billAccessService.getBill(billId).subscribe({
			next: bill => {
				if (!bill) return;

				this.bill = bill;

				this.form.patchValue({
					name: bill.name,
					memo: bill.memo,
				});

				this.bill.userList.forEach(user => this.addUser(user));
			},
			error: error => {
				console.log(error);
			},
		});
	}

	addUser(user?: User) {
		const userForm = this.formBuilder.group({
			id: new FormControl(user?.id ?? this.formService.generateId(), Validators.required),
			name: new FormControl(user?.name ?? null, Validators.required),
		});
		this.userFormList.push(userForm);
	}

	removeUser(index: number) {
		this.userFormList.removeAt(index);
	}

	save() {
		this.formService
			.validate(this.form)
			.pipe(
				switchMap(() => {
					const formValue = this.form.getRawValue();
					const request: BillDetail = {
						id: this.bill?.id ?? this.formService.generateId(),
						name: formValue.name || '',
						memo: formValue.memo || '',
						userList: formValue.userList.filter((user): user is User => user !== null),
						createdAt: this.data?.isEdit ? this.bill?.createdAt! : new Date().toISOString(),
						updatedAt: this.data?.isEdit ? new Date().toISOString() : null,
						expenseList: this.bill?.expenseList || [],
						balanceList: this.bill?.balanceList || [],
					};
					return iif(
						() => !!this.data?.isEdit,
						this.billAccessService.updateBill(request),
						this.billAccessService.createBill(request)
					);
				})
			)
			.subscribe({
				next: () => {
					this.messageService.add({
						severity: 'success',
						summary: '成功',
						detail: '更新成功',
					});

					this.refresh.emit();
					this.hide.emit();
				},
				error: error => {
					console.error('Error saving bill:', error);
				},
			});
	}
}
