import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './modal/edit/edit.component';
import { UserService } from './user.service';
import { User } from '@shared/interface';
import { Observable } from 'rxjs';

@Component({
	selector: 'yo-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	userList$: Observable<User[]> = this.userService.userList$;

	badgeColorList = [
		'bg-primary',
		'bg-secondary',
		'bg-success',
		'bg-danger',
		'bg-warning text-dark',
		'bg-info text-dark',
		'bg-dark'
	] as const;

	constructor(
		private modalService: NgbModal,
		private userService: UserService
	) {}

	ngOnInit(): void {
		const userList = this.userService.getUserList();
		this.userService.patchUserList(userList);
	}

	onCreateOpen() {
		const modalRef = this.modalService.open(EditComponent, {
			centered: true,
			scrollable: true,
			backdrop: 'static'
		});
	}
}
