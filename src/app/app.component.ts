import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@service';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'yo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [ButtonModule],
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
