import * as yup from "yup";
import { FIELD_FORM_ID, FIELD_G_RECAPTCHA_RESPONSE } from "./constants";

export const formSchema = yup.object({
  data: yup.object().required("data is required"),
  [FIELD_FORM_ID]: yup
    .number()
    .integer("formId must be an integer")
    .positive("formId must be a positive integer")
    .required("formId is required"),
  [FIELD_G_RECAPTCHA_RESPONSE]: yup
    .string()
    .required("g-recaptcha-response is required"),
});
