import * as yup from "yup";
import { FIELD_FORM_ID, FIELD_G_RECAPTCHA_RESPONSE } from "./constants";

export const formSchema = yup.object({
  //   subject: yup.string().required("subject is required"),
  //   body: yup.string().required("body is required"),
  data: yup.object().required("data is required"),

  //   senderEmail: yup
  //     .string()
  //     .email("Invalid email format")
  //     .required("senderEmail is required"),
  //   senderName: yup.string().required("senderName is required"),
  [FIELD_FORM_ID]: yup
    .number()
    .integer("formId must be an integer")
    .positive("formId must be a positive integer")
    .required("formId is required"),
  [FIELD_G_RECAPTCHA_RESPONSE]: yup
    .string()
    .required("g-recaptcha-response is required"),
});
