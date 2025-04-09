import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { FormItemComponent } from '@shared/component';
import { BillDetail, Expense, ExpenseUserAmount, User } from '@shared/model';
import { FormService } from '@shared/service';
import { Button } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { Dialog } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { of, switchMap } from 'rxjs';
import { BillAccessService } from '../bill-access.service';
import { BillService } from '../bill.service';

@Component({
	selector: 'yo-bill-expense-edit',
	imports: [
		Button,
		Dialog,
		Divider,
		InputText,
		InputNumber,
		Textarea,
		InputGroup,
		InputGroupAddon,
		DatePicker,
		FormItemComponent,
		ReactiveFormsModule,
	],
	templateUrl: './bill-expense-edit.component.html',
	styleUrl: './bill-expense-edit.component.scss',
})
export class BillExpenseEditComponent implements OnInit {
	@Input() data: { billId: string; expenseId?: string; isEdit?: boolean } | null = null;

	@Output() hide = new EventEmitter();
	@Output() refresh = new EventEmitter();

	visible: boolean = true;

	bill: BillDetail | null = null;

	expenseList: Expense[] = [];
	expense: Expense | null = null;

	userDict: Record<string, string> = {};

	form = this.formBuilder.group({
		id: new FormControl('', Validators.required),
		name: new FormControl('', Validators.required),
		occurrenceTime: new FormControl(new Date(), Validators.required),
		amount: new FormControl(0, [Validators.required, Validators.min(0)]),
		memo: new FormControl(''),
		payerList: this.formBuilder.array([], Validators.required),
		splitterList: this.formBuilder.array([], Validators.required),
	});

	get payerFormList(): FormArray {
		return this.form.get('payerList') as FormArray;
	}

	get splitterFormList(): FormArray {
		return this.form.get('splitterList') as FormArray;
	}

	isPayerTotalValid: boolean = true;
	isSplitterTotalValid: boolean = true;

	constructor(
		private formBuilder: FormBuilder,
		private billAccessService: BillAccessService,
		private billService: BillService,
		private formService: FormService
	) {}

	ngOnInit(): void {
		if (!this.data?.billId) {
			return this.hide.emit();
		}

		this.getBill(this.data.billId);

		this.form.valueChanges.subscribe(() => {
			this.isPayerTotalValid = this.getIsPayerTotalValid();
			this.isSplitterTotalValid = this.getIsSplitterTotalValid();
		});
	}

	getBill(billId: string) {
		this.billAccessService.getBill(billId).subscribe({
			next: bill => {
				if (!bill) return;

				this.bill = bill;

				this.userDict = bill.userList.reduce((acc: Record<string, string>, user) => {
					acc[user.id] = user.name;
					return acc;
				}, {});

				this.expenseList = bill.expenseList || [];

				this.expense =
					this.bill.expenseList.find(expense => expense.id === this.data?.expenseId) || null;

				if (this.expense) {
					this.form.patchValue({
						id: this.expense.id,
						name: this.expense.name,
						occurrenceTime: new Date(this.expense.occurrenceTime),
						amount: this.expense.amount,
						memo: this.expense.memo,
					});

					this.expense.payerList.forEach(payer => {
						this.addPayer(payer);
					});

					this.expense.splitterList.forEach(splitter => {
						this.addSplitter(splitter);
					});
				} else {
					this.form.patchValue({
						id: this.formService.generateId(),
						name: null,
						occurrenceTime: new Date(),
						amount: 0,
						memo: null,
					});

					this.bill.userList.forEach(user => {
						this.addPayer({ userId: user.id, amount: 0 });
						this.addSplitter({ userId: user.id, amount: 0 });
					});
				}
			},
			error: error => {
				console.log(error);
			},
		});
	}

	addPayer(payer?: ExpenseUserAmount) {
		this.payerFormList.push(
			this.formBuilder.group({
				userId: new FormControl(
					payer?.userId ?? this.formService.generateId(),
					Validators.required
				),
				amount: new FormControl(payer?.amount ?? 0, [Validators.required, Validators.min(0)]),
			})
		);
	}
	removePayer(index: number) {
		this.payerFormList.removeAt(index);
	}

	addSplitter(splitter?: ExpenseUserAmount) {
		this.splitterFormList.push(
			this.formBuilder.group({
				userId: new FormControl(
					splitter?.userId ?? this.formService.generateId(),
					Validators.required
				),
				amount: new FormControl(splitter?.amount ?? 0, [Validators.required, Validators.min(0)]),
			})
		);
	}
	removeSplitter(index: number) {
		this.splitterFormList.removeAt(index);
	}

	getIsPayerTotalValid(): boolean {
		const totalAmount = this.form.get('amount')?.value || 0;
		const payerTotal = this.payerFormList.controls.reduce((sum, control) => {
			return sum + (control.get('amount')?.value || 0);
		}, 0);

		return payerTotal === totalAmount;
	}

	getIsSplitterTotalValid(): boolean {
		const totalAmount = this.form.get('amount')?.value || 0;
		const splitterTotal = this.splitterFormList.controls.reduce((sum, control) => {
			return sum + (control.get('amount')?.value || 0);
		}, 0);

		return splitterTotal === totalAmount;
	}

	distributeAmountEvenly() {
		const totalAmount = this.form.get('amount')?.value || 0;
		const splitterCount = this.splitterFormList.length;

		if (splitterCount === 0) return;

		const evenAmount = Math.floor((totalAmount * 100) / splitterCount) / 100; // Avoid floating-point issues
		let remainder = Math.round((totalAmount - evenAmount * splitterCount) * 100); // Convert to cents for precision

		this.splitterFormList.controls.forEach((control, index) => {
			let amount = evenAmount;

			// Distribute the remainder cent by cent
			if (remainder > 0) {
				amount += 0.01;
				remainder -= 1;
			}

			// Ensure the amount is rounded to 2 decimal places
			amount = Math.round(amount * 100) / 100;
			control.get('amount')?.setValue(amount);
		});
	}

	save() {
		console.log(this.form.getRawValue());
		this.formService
			.validate(this.form)
			.pipe(
				switchMap(() => {
					const formValue = this.form.getRawValue();
					const expense: Expense = {
						id: formValue.id!,
						name: formValue.name!,
						occurrenceTime: formValue.occurrenceTime?.toISOString() || '',
						amount: formValue.amount!,
						memo: formValue.memo!,
						payerList: formValue.payerList.filter((payer): payer is ExpenseUserAmount => !!payer),
						splitterList: formValue.splitterList.filter(
							(splitter): splitter is ExpenseUserAmount => !!splitter
						),
					};

					const expenseList = !!this.data?.isEdit
						? this.bill?.expenseList.map(exp => {
								return exp.id === formValue.id ? expense : exp;
							}) || []
						: [...this.expenseList, expense];

					const bill: BillDetail = {
						id: this.bill?.id!,
						name: this.bill?.name!,
						memo: this.bill?.memo!,
						createdAt: this.bill?.createdAt!,
						updatedAt: new Date().toISOString(),
						userList: this.bill?.userList.filter((user): user is User => !!user && !!user.id) || [],
						expenseList: expenseList.filter((exp): exp is Expense => !!expense.id),
						balanceList: this.billService.getBalanceList(expenseList),
					};

					return of(bill);
				}),
				switchMap(bill => this.billAccessService.updateBill(bill))
			)
			.subscribe({
				next: res => {
					this.refresh.emit();
					this.hide.emit();
				},
				error: error => {
					console.log(error);
				},
			});
	}
}
