import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { COLOR_KEY } from '../config/constants';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private colorSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem(COLOR_KEY) || '#FFFFFF'
  );

  color$ = this.colorSubject.asObservable();

  setColor(color: string): void {
    if (this.colorSubject.value !== color) {
      this.colorSubject.next(color);
      localStorage.setItem(COLOR_KEY, color);
    }
  }
}
