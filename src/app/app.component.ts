import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'yo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [ButtonModule],
})
export class AppComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
