import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  private modalContentSubject = new BehaviorSubject<any>(null);
  modalContent$ = this.modalContentSubject.asObservable();

  open(content: any) {
    this.modalContentSubject.next(content);
    this.isOpenSubject.next(true);
  }

  close() {
    this.modalContentSubject.next(null);
    this.isOpenSubject.next(false);
  }
}
