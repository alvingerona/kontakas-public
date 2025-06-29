export const emailTemplateHTML = ({
  email,
  name,
  subject,
  timestamp,
  message,
  title,
}: {
  email: string;
  name: string;
  subject: string;
  timestamp: string;
  message: string;
  title: string;
}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
    <div style="padding: 20px; border-top: 4px solid #3498db;">
        <h2>${title}</h2>
        
        <p>You have received a new message from your website's contact form.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Date/Time:</strong> ${timestamp}</p>
            <p><strong>Message:</strong></p>
            <p style="margin-left: 15px; white-space: pre-wrap;">${message}</p>
        </div>
        
        <p>To respond, use their email address: <a href="mailto:${email}">${email}</a></p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
            <p>This message was sent from the contact form on your website.
        </div>
    </div>
</body>
</html>
    `;
};

export const emailTemplateText = ({
  email,
  name,
  subject,
  timestamp,
  message,
  title,
}: {
  email: string;
  name: string;
  subject: string;
  timestamp: string;
  message: string;
  title: string;
}) => {
  return `
${title}
You have received a new message from your website's contact form.
Name: ${name}
Email: ${email}
Subject: ${subject}
Date/Time: ${timestamp}
Message:
${message}
To respond, use their email address: ${email}
This message was sent from the contact form on your website.
  `;
};
