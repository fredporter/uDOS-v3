export class ToolExecutionError extends Error {
  readonly code: string;
  readonly retryable: boolean;

  constructor(code: string, message: string, retryable = false) {
    super(message);
    this.name = "ToolExecutionError";
    this.code = code;
    this.retryable = retryable;
  }
}

export function normalizeToolFailure(e: unknown): {
  code: string;
  message: string;
  retryable: boolean;
} {
  if (e instanceof ToolExecutionError) {
    return { code: e.code, message: e.message, retryable: e.retryable };
  }
  if (e instanceof Error) {
    return {
      code: "internal_error",
      message: e.message,
      retryable: false,
    };
  }
  return {
    code: "internal_error",
    message: String(e),
    retryable: false,
  };
}
