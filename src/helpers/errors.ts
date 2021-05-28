export class LolStatsError extends Error {
    public readonly application: string = process.env.APPLICATION || 'unnamed';
    public readonly code: number;
    #type: string;

    constructor(code: number, message?: string|undefined) {
      super();
      this.code = code;
      this.message = message || '';
      this.#type = 'LolStatsError';
    }
  }

export class Unauthorized extends LolStatsError {
    public status: string|number;
    #inner: Error;
    constructor(error?: Error) {
      super(401);
      this.name = 'UnauthorizedError';
      this.message = error?.message || 'Unauthorized';
      Error.call(this, this.message);
      Error.captureStackTrace(this, this.constructor);
      this.status = 401;
      this.#inner = error || new Error('Unauthorized');
    }
  }

export function generic(message?: string|undefined, code?: number): LolStatsError {
    return new LolStatsError(code || 500, message);
  }

export const MethodNotAllowedError = (message?: string|undefined): LolStatsError => {
    return generic(message, 405);
  };

export const NotFoundError = (message?: string|undefined): LolStatsError => {
    return generic(message, 404);
  };

export const ForbiddenError = (message?: string|undefined): LolStatsError => {
    return generic(message, 403);
  };

export const UnauthorizedError = (error?: Error): Unauthorized => {
    return new Unauthorized(error);
  };

export const BadRequestError = (message?: string|undefined): LolStatsError => {
    return generic(message, 400);
  };

export const ConflictError = (message?: string|undefined): LolStatsError => {
    return generic(message, 409);
  };

export const BadEntity = (message?: string|undefined): LolStatsError => {
    return generic(message, 422);
  };

export const Confict = (message?: string|undefined): LolStatsError => {
    return generic(message, 409);
  };
