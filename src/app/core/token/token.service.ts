import { Injectable } from '@angular/core';

const CHAVE = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  hasToken (): boolean {
    return !!this.getToken();
  }

  setToken (token: string): void {
    window.localStorage.setItem(CHAVE, token);
  }

  getToken (): string {
    return window.localStorage.getItem(CHAVE);
  }

  removeToken (): void {
    window.localStorage.removeItem(CHAVE);
  }
}
