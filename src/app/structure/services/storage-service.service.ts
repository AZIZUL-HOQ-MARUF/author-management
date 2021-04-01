import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

constructor() { }

getFromLocalStorage(key: string) {
  return localStorage.getItem(key);
}

setToLocalStorage(key: string, value: string): void {
  localStorage.setItem(key,value);
}

removeFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

clearLocalStorage(): void {
  localStorage.clear();
}

}
