import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '@theme';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
	selector: 'yo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [ToastModule, ConfirmDialogModule, NgClass, RouterOutlet],
})
export class AppComponent implements OnInit {
	themeMode = 'light';

	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {
		this.themeService.init();
		this.themeMode = this.themeService.getTheme();
	}

	toggleTheme() {
		this.themeService.toggle();
		this.themeMode = this.themeService.getTheme();
	}
}
