import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as yup from "yup";
import {
  success,
  responseHandler,
  validationError,
} from "../../utils/response";
import { validateSchema } from "../../utils/validation";
import { Organizations } from "../../respositories/Organizations";
import { formSchema } from "./schema";
import { FIELD_FORM_ID, FIELD_G_RECAPTCHA_RESPONSE } from "./constants";
import { recaptchaValidate } from "./recaptcha-validate";
import { Forms } from "../../respositories/Forms";
import { ENABLE_RECAPTCHA } from "../../utils/env";
import { logger } from "../../utils/logger";

type ContactForm = yup.InferType<typeof formSchema>;

async function handleSendContactUsForm(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const postData = JSON.parse(event.body ?? "{}");
  const validatedData = await validateSchema<ContactForm>(formSchema, postData);

  if (!validatedData.isValid) {
    return validationError({
      errors: validatedData.errors,
    });
  }

  const formId = validatedData.data?.[FIELD_FORM_ID];
  const formData = validatedData.data?.data;
  const recaptchaResponse = validatedData.data?.[FIELD_G_RECAPTCHA_RESPONSE];

  if (!formData || !recaptchaResponse || !formId) {
    return validationError({
      message: "Missing required field.",
      errors: {},
    });
  }

  const form = await new Forms().findById(formId);

  if (!form) {
    return validationError({
      message: "Form not found",
      errors: { formId: "Form not found" },
    });
  }

  if (form.isActive === false) {
    return validationError({
      message: "Form is not active",
      errors: { formId: "Form is not active" },
    });
  }

  const organizationId = form.organizationId;

  if (!organizationId) {
    return validationError({
      message: "organizationId is required",
      errors: { organizationId: "organizationId is required" },
    });
  }
  const organization = await new Organizations().findById(organizationId);

  if (!organization) {
    return validationError({
      message: "Organization not found",
      errors: { organizationId: "Organization not found" },
    });
  }

  if (ENABLE_RECAPTCHA) {
    logger(`Validating reCAPTCHA for organization ${organizationId}`, {
      organizationId,
      formId,
    });

    const validReCaptcha = await recaptchaValidate({
      organization,
      recaptchaResponse,
    });

    if (!validReCaptcha.isValid) {
      if (validReCaptcha.error) {
        return validReCaptcha.error;
      } else {
        // other unexpected errors
        return validationError({
          message: "Invalid reCAPTCHA response",
          errors: {
            CONNECTOR_PLATFORM_GOOGLE_RECAPTCHA: "Invalid reCAPTCHA response",
          },
        });
      }
    }
  }

  form.setOrganization(organization);
  const procedures = form.initializeProcedures();

  for (let i = 0; i < procedures.length; i++) {
    const procedure = procedures[i];
    if (!procedure) {
      continue;
    }

    const valid = await procedure.process(formData, procedure.getAttributes());

    if (!valid.isValid) {
      return validationError({
        message: "Validation failed",
        errors: valid.errors,
      });
    }
  }

  return success({
    message: "Form submitted successfully",
  });
}

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> =>
  await responseHandler({
    event,
    handler: handleSendContactUsForm,
    handlerName: "SendContactUsForm",
  });
