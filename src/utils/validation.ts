import * as yup from "yup";

export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  errors?: Record<string, string>;
}

export async function validateSchema<T>(
  schema: yup.Schema,
  data: unknown
): Promise<ValidationResult<T>> {
  try {
    const validatedData = await schema.validate(data, { abortEarly: false });
    return {
      isValid: true,
      data: validatedData as T,
    };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};

      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });

      return {
        isValid: false,
        errors,
      };
    }
    throw error;
  }
}
