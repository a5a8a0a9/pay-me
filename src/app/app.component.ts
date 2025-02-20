import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BillCreateComponent } from '@bill/bill-create/bill-create.component';
import { DialogControl } from '@class';
import { AccessService, ThemeService } from '@service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

@Component({
	selector: 'yo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [
		ButtonModule,
		CardModule,
		ToastModule,
		NgClass,
		BillCreateComponent,
		AsyncPipe,
		RouterLink,
	],
})
export class AppComponent implements OnInit {
	themeMode = 'light';

	bills$ = this.accessService.getDocList('bills');

	billCreateCtrl = new DialogControl();

	constructor(
		private themeService: ThemeService,
		private accessService: AccessService
	) {}

	ngOnInit(): void {
		this.themeService.init();
		this.themeMode = this.themeService.getTheme();
	}

	toggleTheme() {
		this.themeService.toggle();
		this.themeMode = this.themeService.getTheme();
	}

	async deleteBill(id: string) {
		try {
			const response = await this.accessService.deleteDoc('bills', id);
			console.log(response);
		} catch (e) {
			console.log(e);
		}
	}
}
