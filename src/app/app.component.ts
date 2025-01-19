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
	themeMode = this.themeService.getTheme();

	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {
		this.themeService.init();
	}

	toggleTheme() {
		this.themeService.toggle();
	}
}
