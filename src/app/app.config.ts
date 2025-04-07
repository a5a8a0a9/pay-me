import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { ConfirmationService, MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';

import { environment } from '@environment';
import { NoirPreset } from '@theme';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		ConfirmationService,
		MessageService,
		provideAnimationsAsync(),
		provideRouter(routes),
		provideServiceWorker('ngsw-worker.js', {
			enabled: environment.production,
			registrationStrategy: 'registerWhenStable:30000',
		}),
		providePrimeNG({
			theme: {
				preset: NoirPreset,
				options: {
					darkModeSelector: '.yo-dark',
					cssLayer: {
						name: 'primeng',
						order: 'tailwind-base, primeng, tailwind-utilities',
					},
				},
			},
		}),
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		provideFirestore(() => getFirestore()),
	],
};
