import { Injectable } from '@angular/core';

type ThemeMode = 'light' | 'dark';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	constructor() {}

	init() {
		const currentTheme = this.getTheme();
		if (!!currentTheme) {
			this.setTheme(currentTheme);
			return;
		}

		const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
		const isDarkMode: boolean = prefersDarkTheme.matches;

		if (isDarkMode) {
			this.setTheme('dark');
		} else {
			this.setTheme('light');
		}
	}

	toggle() {
		const themeMode = this.getTheme();

		this.setTheme(themeMode === 'dark' ? 'light' : 'dark');
	}

	setTheme(theme: ThemeMode) {
		localStorage.setItem('ui-theme', theme);

		const element: HTMLHtmlElement | null = document.querySelector('html');

		if (theme === 'light') {
			element?.classList.remove('yo-dark');
		} else {
			element?.classList.add('yo-dark');
		}
	}

	getTheme(): ThemeMode {
		return (localStorage.getItem('ui-theme') ?? 'light') as ThemeMode;
	}
}
