import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';
import { FormLabelComponent } from '../form-label/form-label.component';

@Component({
	selector: 'yo-form-item',
	imports: [FormLabelComponent, NgClass, NgStyle, FormErrorComponent],
	templateUrl: './form-item.component.html',
	styleUrl: './form-item.component.scss',
})
export class FormItemComponent {
	@Input() label: string = '';
	@Input() required: boolean = false;

	@Input() control?: AbstractControl | FormControl;

	@Input() style: Record<string, string> = {};
	@Input() styleClass: string = '';

	@Input() labelTooltip: string = '';
	@Input() labelTooltipIcon: string = '';

	get invalid() {
		if (!this.control) return false;

		return this.control.invalid && (this.control.touched || this.control.dirty);
	}

	hasValidator_required() {
		return this.control?.hasValidator(Validators.required);
	}
}
