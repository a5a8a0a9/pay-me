import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';

@Component({
	selector: 'yo-bill',
	imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, DatePickerModule],
	templateUrl: './bill.component.html',
	styleUrl: './bill.component.scss',
})
export class BillComponent {
	form = this.formBuilder.group({
		title: new FormControl(''),
		date: new FormControl(''),
	});

	constructor(private formBuilder: FormBuilder) {}
}
