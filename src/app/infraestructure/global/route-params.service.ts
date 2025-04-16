import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteParamsService {
  private route = inject(ActivatedRoute);
  private paramsSubject = new BehaviorSubject<any>({});
  params$ = this.paramsSubject.asObservable();

  constructor() {
    this.route.queryParams.subscribe((params) => {
      this.paramsSubject.next(params);
    });
  }

  getParams() {
    return this.paramsSubject.value;
  }
}
