import { Injectable } from '@angular/core';

import { IUser } from 'src/app/core/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  saveUserData(data: IUser): void {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  getUserData(): IUser | null {
    const token = localStorage.getItem('userData');
    if (token) {
      return JSON.parse(token);
    }
    return null;
  }

  deleteUserData(): void {
    localStorage.removeItem('userData');
  }

  get isLogged(): boolean {
    return localStorage.getItem('userData') ? true : false;
  }
}
