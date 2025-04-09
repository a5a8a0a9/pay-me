import { Component, Input } from '@angular/core';

@Component({
	selector: 'yo-form-label',
	imports: [],
	templateUrl: './form-label.component.html',
	styleUrl: './form-label.component.scss',
})
export class FormLabelComponent {
	@Input() label: string = '';
	@Input() required: boolean = false;
}
