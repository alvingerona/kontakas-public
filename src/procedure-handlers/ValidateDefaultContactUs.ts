import * as yup from "yup";
import AbstractProcedureHandler from "./AbstractProcedureHandler";
import { validateSchema, ValidationResult } from "../utils/validation";

const formSchema = yup.object({
  subject: yup.string().required("subject is required"),
  body: yup.string().required("body is required"),
  senderEmail: yup
    .string()
    .email("Invalid email format")
    .required("senderEmail is required"),
  senderName: yup.string().required("senderName is required"),
});

type ContactUsForm = yup.InferType<typeof formSchema>;

export default class ValidateDefaultContactUs extends AbstractProcedureHandler {
  async process(
    formData: Record<string, any>
  ): Promise<ValidationResult<ContactUsForm>> {
    const validatedData = await validateSchema<ContactUsForm>(
      formSchema,
      formData
    );

    return validatedData;
  }
}
