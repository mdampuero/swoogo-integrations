import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UtilsService {
	constructor() { }
	generatePassword() {
		let passwordLength: number = 48;
		const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$&_-+=";
		let generatedPassword = "";
		for (let i = 0; i < passwordLength; i++) {
			const randomIndex = Math.floor(Math.random() * charset.length);
			generatedPassword += charset[randomIndex];
		}
		return generatedPassword;
	}
}
