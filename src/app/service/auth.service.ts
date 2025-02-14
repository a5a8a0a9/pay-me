import { inject, Injectable } from '@angular/core';
import { Auth, getAuth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	firestore: Firestore = inject(Firestore);

	auth: Auth = getAuth();

	googleAuthProvider = new GoogleAuthProvider();

	constructor() {}

	onAuthStateChanged() {
		// onAuthStateChanged(this.auth, user => {
		// 	console.log(user);
		// });
	}

	async signinGoogle() {
		const authResponse = await signInWithPopup(this.auth, this.googleAuthProvider);
		const credential = GoogleAuthProvider.credentialFromResult(authResponse);
		const token = credential?.accessToken;
		const user = authResponse.user;
		console.log('auth', this.auth);
		console.log('authResponse', authResponse);
		console.log('credential', credential);
		console.log('token', token);
		console.log('user', user);
	}
}
