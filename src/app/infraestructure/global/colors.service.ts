import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { COLOR_KEY } from '../config/constants';

interface ColorMap {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private colorMapSubject = new BehaviorSubject<ColorMap>({});
  colorMap$ = this.colorMapSubject.asObservable();

  setColors(colors: ColorMap): void {
    this.colorMapSubject.next(colors);
    localStorage.setItem(COLOR_KEY, JSON.stringify(colors));
  }

  getColorByKey(key: string): string {
    return this.colorMapSubject.value[key] || '#000';
  }

  initializeColors(): void {
    const savedColors = localStorage.getItem(COLOR_KEY);
    if (savedColors) {
      this.colorMapSubject.next(JSON.parse(savedColors));
    }
  }
}
