export class ApiError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(message: string, args: { status: number; details?: unknown }) {
    super(message);
    this.name = "ApiError";
    this.status = args.status;
    this.details = args.details;
  }
}

