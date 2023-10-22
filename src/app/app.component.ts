import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface PageMenu {
	id: string;
	name: string;
	path: string;
}

@Component({
	selector: 'yo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	menuList: PageMenu[] = [
		{
			id: 'bill',
			path: '/bill',
			name: '帳單',
		},
		{
			id: 'user',
			path: '/user',
			name: '使用者',
		},
	];

	currentUrl: string = '';

	constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

	ngOnInit(): void {
		this.router.events
			.pipe(filter((response) => response instanceof NavigationEnd))
			.subscribe((response) => {
				this.currentUrl = (response as NavigationEnd).url;
			});
	}
}
