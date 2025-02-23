import { Injectable } from '@angular/core';
import { Confirmation, ConfirmationService } from 'primeng/api';

const NORMAL_CONFIRM_OPTION: Confirmation = {
	key: 'normal-confirm',
	header: '確認',
	message: '',
	closable: true,
	closeOnEscape: true,
	icon: 'pi pi-info-circle',
	defaultFocus: 'reject',
	acceptButtonProps: {
		label: '確認',
	},
	rejectButtonProps: {
		label: '取消',
		severity: 'secondary',
		outlined: true,
	},
};
const DELETE_CONFIRM_OPTION: Confirmation = {
	key: 'delete-confirm',
	header: '確認',
	message: '確定要刪除嗎?',
	closable: true,
	closeOnEscape: true,
	icon: 'pi pi-info-circle',
	defaultFocus: 'reject',
	acceptButtonProps: {
		label: '刪除',
		severity: 'danger',
	},
	rejectButtonProps: {
		label: '取消',
		severity: 'secondary',
		outlined: true,
	},
};

@Injectable({
	providedIn: 'root',
})
export class ConfirmService {
	constructor(private confirmationService: ConfirmationService) {}

	confirm({
		type = 'normal',
		option = {},
	}: { type?: 'normal' | 'delete'; option?: Confirmation } = {}) {
		const _defaultOption = type === 'delete' ? DELETE_CONFIRM_OPTION : NORMAL_CONFIRM_OPTION;

		this.confirmationService.confirm({
			..._defaultOption,
			...option,
		});
	}
}
