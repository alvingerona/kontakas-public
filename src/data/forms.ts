const forms = [
  {
    id: 1,
    name: "Hello World Form",
    organizationId: 1,
    isActive: true,
    procedures: [
      {
        key: "validate-default-contact-us",
      },
      {
        key: "hello-world",
      },
    ],
  },

  {
    id: 1,
    name: "SES Contact Us Notification",
    organizationId: 1,
    isActive: true,
    procedures: [
      {
        key: "validate-default-contact-us",
      },
      {
        key: "aws-ses-contact-us-notification",
      },
    ],
  },
];

export default forms;
