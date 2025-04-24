export {};
declare global {
  namespace API_ROUTES {
    interface BaseRoute {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
      response: unknown;
      query?: unknown;
      body?: unknown;
    }
  }

  namespace API_RESPONSE {
    interface GlobalResponse<T, D = T extends any[] ? T : T[]> {
      status: number;
      message: string;
      metadata: {
        timestamp: string;
        path: string;
      };
      data: D;
    }
  }
}
