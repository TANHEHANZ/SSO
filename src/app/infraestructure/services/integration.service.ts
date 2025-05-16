import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IntegrationDTO } from '../models/integrations/integraion.response';

@Injectable({
  providedIn: 'root',
})
export class IntegrationService {
  private configurationState = new BehaviorSubject<{
    services: IntegrationDTO | null;
    config: any;
    tokens: any;
    showPanel: boolean;
  }>({
    services: null,
    config: null,
    tokens: null,
    showPanel: false,
  });

  currentConfig$ = this.configurationState.asObservable();

  updateServiceConfig(service: IntegrationDTO) {
    const currentState = this.configurationState.value;
    this.configurationState.next({
      ...currentState,
      services: service,
      showPanel: !currentState,
    });
  }
  updateConfig(config: any) {
    const currentState = this.configurationState.value;
    this.configurationState.next({
      ...currentState,
      config,
      showPanel: true,
    });
  }

  updateTokens(tokens: any) {
    const currentState = this.configurationState.value;
    this.configurationState.next({
      ...currentState,
      tokens,
      showPanel: true,
    });
  }

  getFullConfiguration() {
    return this.configurationState.value;
  }

  hasChanges(): boolean {
    const currentState = this.configurationState.value;
    return currentState.services || currentState.config || currentState.tokens;
  }
  clearConfiguration() {
    this.configurationState.next({
      services: null,
      config: null,
      tokens: null,
      showPanel: false,
    });
  }
}
