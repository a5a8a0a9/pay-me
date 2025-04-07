import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { filter, Observable, of, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class FormService {
	constructor(private messageService: MessageService) {}

	markAsTouchedAndDirty(form: FormGroup) {
		form.markAllAsTouched();
		form.markAsDirty();
	}

	validate(form: FormGroup): Observable<boolean> {
		return of(form.valid).pipe(
			tap(() => {
				this.markAsTouchedAndDirty(form);

				form.invalid &&
					this.messageService.add({
						severity: 'warn',
						summary: '提醒',
						detail: '尚有欄位未填寫或格式錯誤',
					});
			}),
			filter(isValid => isValid)
		);
	}
}
