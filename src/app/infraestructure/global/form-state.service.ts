import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type FormType = 'initial' | 'email' | 'ci' | null;

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private expandedForm = new BehaviorSubject<boolean>(false);
  private currentForm = new BehaviorSubject<FormType>('initial');

  expandedForm$ = this.expandedForm.asObservable();
  currentForm$ = this.currentForm.asObservable();

  toggleFormExpansion(expanded: boolean, formType: FormType = null) {
    this.expandedForm.next(expanded);
    this.currentForm.next(formType);
  }
}
