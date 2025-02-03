import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { ThemeService } from '@service';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'yo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [ButtonModule, NgClass],
})
export class AppComponent implements OnInit {
	firestore: Firestore = inject(Firestore);

	themeMode = 'light';

	list = [
		{ id: 1 },
		{ id: 1 },
		{ id: 1 },
		{ id: 1 },
		{ id: 1 },
		{ id: 1 },
		{ id: 1 },
		{ id: 1 },
		{ id: 1 },
		{ id: 1 },
		{ id: 1 },
		{ id: 1 },
		{ id: 1 },
		{ id: 1 },
		{ id: 1 },
		{ id: 1 },
	];

	constructor(private themeService: ThemeService) {}

	ngOnInit(): void {
		this.themeService.init();
		this.themeMode = this.themeService.getTheme();
		this.getData();
	}

	async getData() {
		const users = collection(this.firestore, 'users');

		collectionData(users).subscribe(res => {
			console.log(res);
		});
	}

	toggleTheme() {
		this.themeService.toggle();
		this.themeMode = this.themeService.getTheme();
	}

	async add() {
		const user = await addDoc(collection(this.firestore, 'users'), {
			name: 'hehe',
		});
		console.log(user);
	}
}
