import { Component, EventEmitter, Output } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { AccessService, AuthService, FormService } from '@service';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
	selector: 'yo-bill-create',
	imports: [
		DialogModule,
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		InputTextModule,
		DatePickerModule,
	],
	templateUrl: './bill-create.component.html',
	styleUrl: './bill-create.component.scss',
})
export class BillCreateComponent {
	@Output() hide = new EventEmitter();

	visible: true = true;

	form = this.formBuilder.group({
		title: new FormControl('', Validators.required),
		participants: this.formBuilder.array([
			this.formBuilder.group({
				name: new FormControl('', Validators.required),
			}),
		]),
	});

	get participantFormList(): FormArray {
		return this.form.get('participants') as FormArray;
	}

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private accessService: AccessService,
		private formService: FormService
	) {}

	addParticipants() {
		const newParticipantForm = this.formBuilder.group({
			name: new FormControl('', Validators.required),
		});
		this.participantFormList.push(newParticipantForm);
	}

	removeParticipants(index: number) {
		this.participantFormList.removeAt(index);
	}

	save() {
		this.formService.validate(this.form).subscribe({
			next: () => {
				const formValue = this.form.getRawValue();
				const request = {
					title: formValue.title,
					participants: formValue.participants.map(item => item.name),
					createdAt: Timestamp.now(),
					ownerId: 'young',
				};

				this.saveBills(request);
				console.log(request);
			},
		});
	}

	async saveBills(request: any) {
		try {
			await this.accessService.createDoc('bills', request);
			this.hide.emit();
		} catch (e) {
			console.log(e);
		}
	}
}
