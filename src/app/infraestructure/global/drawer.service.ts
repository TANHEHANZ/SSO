import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  open() {
    console.log('abriendo', this.isOpen$);
    this.isOpenSubject.next(true);
  }

  close() {
    this.isOpenSubject.next(false);
  }

  toggle() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }
}
