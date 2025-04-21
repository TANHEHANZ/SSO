import { Injectable } from '@angular/core';
import { Toast } from '../lib/toast/toast.service';

export interface ErrorResponse {
  status: number;
  message: string;
  metadata?: {
    timestamp: string;
    path: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  private errorMessages = new Map<number, string>([
    [400, 'Credenciales incorrectas. Por favor, verifica tus datos'],
    [401, 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente'],
    [403, 'Tu cuenta está temporalmente bloqueada por seguridad'],
    [429, 'Has excedido el número de intentos. Por favor, espera unos minutos'],
    [500, 'Hubo un problema en el servidor. Por favor, intenta más tarde'],
  ]);

  getErrorMessage(error: any): {
    message: string;
    type: Toast['type'];
  } {
    if (!error) {
      return {
        message: 'Ha ocurrido un error inesperado',
        type: 'error',
      };
    }

    if (error.error?.message) {
      return {
        message: error.error.message,
        type: this.getErrorType(error.status),
      };
    }

    return {
      message:
        this.errorMessages.get(error.status) ||
        'Lo sentimos, hubo un problema al conectar',
      type: this.getErrorType(error.status),
    };
  }
  private getErrorType(status: number): Toast['type'] {
    if (status >= 500) return 'error';
    if (status >= 400) return 'info';
    return 'info';
  }
}
