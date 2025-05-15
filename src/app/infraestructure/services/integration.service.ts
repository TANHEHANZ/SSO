import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IntegrationDTO } from '../models/integrations/integraion.response';

@Injectable({
  providedIn: 'root',
})
export class IntegrationService {
  private configurationState = new BehaviorSubject<{
    services: IntegrationDTO[];
    config: any;
    tokens: any;
    showPanel: boolean;
  }>({
    services: [],
    config: null,
    tokens: null,
    showPanel: false,
  });

  currentConfig$ = this.configurationState.asObservable();

  updateServiceConfig(service: IntegrationDTO) {
    const currentState = this.configurationState.value;
    const existingService = currentState.services.find(
      (s) => s.id === service.id
    );

    if (!existingService) {
      this.configurationState.next({
        ...currentState,
        services: [...currentState.services, service],
        showPanel: true,
      });
    } else {
      const updatedServices = currentState.services.filter(
        (s) => s.id !== service.id
      );
      this.configurationState.next({
        ...currentState,
        services: updatedServices,
        showPanel:
          updatedServices.length > 0 ||
          currentState.config ||
          currentState.tokens,
      });
    }
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
    return (
      currentState.services.length > 0 ||
      currentState.config ||
      currentState.tokens
    );
  }
  clearConfiguration() {
    this.configurationState.next({
      services: [],
      config: null,
      tokens: null,
      showPanel: false,
    });
  }
}
