import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
	selector: 'yo-form-error',
	imports: [],
	templateUrl: './form-error.component.html',
	styleUrl: './form-error.component.scss',
})
export class FormErrorComponent {
	@Input() control?: AbstractControl | FormControl;
}
