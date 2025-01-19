import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '@shared/interface';
import * as moment from 'moment';
import { UserService } from '../../user.service';

@Component({
	selector: 'yo-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
	form: FormGroup = this.fb.group({
		list: this.fb.array([]),
	});

	get listForm(): FormArray {
		return this.form.get('list') as FormArray;
	}

	constructor(
		public activeModal: NgbActiveModal,
		private fb: FormBuilder,
		private userService: UserService
	) {}

	ngOnInit() {
		this.addUser();
	}

	addUser() {
		const id = moment().format('x');
		const userForm = this.fb.group({
			id: new FormControl(id),
			name: new FormControl('', [Validators.required]),
		});
		this.listForm.push(userForm);
	}

	removeUser(index: number) {
		this.listForm.removeAt(index);
	}

	onSubmit() {
		const request: Array<User> = this.listForm.value;

		this.userService.createUser(request);
		this.activeModal.close();
	}
}
