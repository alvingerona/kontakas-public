import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

interface SESContact {
  email: string;
}

interface SendMailProps {
  region: string;
  fromEmail: string;
  subject: string;
  bodyPlainText: string;
  bodyHTML: string;
  contacts: SESContact[];
}

export const sesSendMail = async (props: SendMailProps): Promise<any> => {
  const { region, fromEmail, subject, bodyPlainText, bodyHTML, contacts } =
    props;

  const client = new SESClient({ region });
  const toEmails = contacts.map((contact) => contact.email);

  const params = {
    Source: fromEmail,
    Destination: {
      ToAddresses: toEmails,
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
      Body: {
        Text: {
          Data: bodyPlainText,
          Charset: "UTF-8",
        },
        Html: {
          Data: bodyHTML,
          Charset: "UTF-8",
        },
      },
    },
  };

  return await client.send(new SendEmailCommand(params));
};
