import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.darkMode.asObservable();

  constructor() {
    // Check system preference and saved preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (savedTheme) {
      this.setDarkMode(savedTheme === 'dark');
    } else {
      this.setDarkMode(systemPrefersDark);
    }
  }

  toggleDarkMode(): void {
    const newValue = !this.darkMode.value;
    this.darkMode.next(newValue);
    this.updateTheme();
  }

  private setDarkMode(isDark: boolean): void {
    this.darkMode.next(isDark);
    this.updateTheme();
  }

  private updateTheme(): void {
    if (this.darkMode.value) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
