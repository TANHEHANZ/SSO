import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavStateService {
  private isExpanded = new BehaviorSubject<boolean>(true);
  isExpanded$ = this.isExpanded.asObservable();

  toggleNav() {
    this.isExpanded.next(!this.isExpanded.value);
  }
}
