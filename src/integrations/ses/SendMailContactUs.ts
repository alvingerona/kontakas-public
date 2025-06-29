import ConnectorSES from "../../models/Connector/ConnectorSES";
import { emailTemplateHTML, emailTemplateText } from "../../templates/email/send-mail-contact-us";
import { sesSendMail } from "./ses";

export interface SendMailOptions {
  subject: string;
  toEmail: string;
  senderEmail: string;
  senderName: string;
  body: string;
  attributes?: Record<string, any>;
}

export default class SendMailContactUs {
  connectorSES: ConnectorSES;

  constructor(connectorSES: ConnectorSES) {
    this.connectorSES = connectorSES;
  }

  async send(options: SendMailOptions): Promise<any> {
    const region = this.connectorSES.getRegion() || "us-east-1";
    const fromEmail = this.connectorSES.getFromEmail();
    const title = "New Contact Form Submission";

    if (!fromEmail) {
      throw new Error("From email is not set for SES connector");
    }

    try {
      return await sesSendMail({
        region,
        fromEmail,
        subject: options.subject,
        bodyPlainText: emailTemplateText({
          email: options.senderEmail,
          name: options.senderName,
          subject: options.subject,
          timestamp: new Date().toISOString(),
          message: options.body,
          title,
        }),
        bodyHTML: emailTemplateHTML({
          email: options.senderEmail,
          name: options.senderName,
          subject: options.subject,
          timestamp: new Date().toISOString(),
          message: options.body,
          title,
        }),
        contacts: [{ email: options.toEmail }],
      });
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email via SES");
    }
  }
}