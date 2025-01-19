import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

import { providePrimeNG } from 'primeng/config';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { NoirPreset } from './lib';

export const appConfig: ApplicationConfig = {
	providers: [
		importProvidersFrom(BrowserModule),
		provideRouter(routes),
		provideServiceWorker('ngsw-worker.js', {
			enabled: environment.production,
			registrationStrategy: 'registerWhenStable:30000',
		}),
		providePrimeNG({
			theme: {
				preset: NoirPreset,
			},
		}),
	],
};
