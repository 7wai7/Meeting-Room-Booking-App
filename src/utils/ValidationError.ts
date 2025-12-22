export type ValidationErrors = Record<string, { message: string }>;

export class ValidationError extends Error {
  fields: ValidationErrors;

  constructor(fields: ValidationErrors) {
    super("Validation error");
    this.fields = fields;
  }
}
