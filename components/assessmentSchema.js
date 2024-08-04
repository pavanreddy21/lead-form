// schemas/assessmentSchema.js
export const schema = {
  type: "object",
  properties: {
    firstName: { type: "string", title: "First Name" },
    lastName: { type: "string", title: "Last Name" },
    email: { type: "string", format: "email", title: "Email" },
    countryOfCitizenship: { type: "string", title: "Country of Citizenship" },
    linkedinUrl: { type: "string", format: "uri", title: "LinkedIn / Personal Website URL" },
    visaCategory: {
      type: "array",
      title: "Visa categories of interest?",
      items: {
        type: "string",
        enum: ["O1", "EB1A", "EB2 NIW", "I don't know"]
      },
      uniqueItems: true
    },
    helpText: { type: "string", title: "How can we help you?" },
    resume: { type: "string", title: "Resume/CV", contentEncoding: "base64" }
  },
  required: ["firstName", "lastName", "email", "countryOfCitizenship"]
};

export const uischema = {
  type: "VerticalLayout",
  elements: [
    { type: "Control", scope: "#/properties/firstName" },
    { type: "Control", scope: "#/properties/lastName" },
    { type: "Control", scope: "#/properties/email" },
    { type: "Control", scope: "#/properties/countryOfCitizenship" },
    { type: "Control", scope: "#/properties/linkedinUrl" },
    {
      type: "Control",
      scope: "#/properties/visaCategory",
      options: {
        format: "checkbox"
      }
    },
    { type: "Control", scope: "#/properties/helpText", options: { multi: true } },
    {
      type: "Control",
      scope: "#/properties/resume",
      options: {
        format: "file"
      }
    }
  ]
};
