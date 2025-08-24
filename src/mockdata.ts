export const mockdata = {
  formId: "credit_card_onboarding",
  title: "Credit Card Onboarding",
  description: "Please complete the form to apply for your credit card.",
  steps: [
    {
      stepId: "personal_info",
      title: "Personal Information",
      fields: [
        {
          id: "first_name",
          label: "First Name",
          type: "text",
          placeholder: "Enter your first name",
          required: true,
          validation: {
            pattern: "^[A-Za-z]{2,50}$",
            message: "First name must be 2–50 letters only.",
          },
        },
        {
          id: "last_name",
          label: "Last Name",
          type: "text",
          placeholder: "Enter your last name",
          required: true,
          validation: {
            pattern: "^[A-Za-z]{2,50}$",
            message: "Last name must be 2–50 letters only.",
          },
        },
        {
          id: "middle_name",
          label: "Middle Name",
          type: "text",
          placeholder: "Enter your middle name (optional)",
          required: false,
        },
        {
          id: "email",
          label: "Email Address",
          type: "email",
          placeholder: "example@email.com",
          required: true,
          validation: {
            pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            message: "Please enter a valid email address.",
          },
        },
        {
          id: "phone",
          label: "Phone Number",
          type: "text",
          placeholder: "Enter your phone number (optional)",
          required: false,
        },
        {
          id: "dob",
          label: "Date of Birth",
          type: "date",
          required: true,
          validation: {
            minAge: 18,
            message: "You must be at least 18 years old to apply.",
          },
        },
      ],
    },
    {
      stepId: "address_info",
      title: "Address Information",
      fields: [
        {
          id: "address_line1",
          label: "Street Address",
          type: "text",
          required: true,
          validation: {
            minLength: 5,
            maxLength: 100,
            message: "Street address must be between 5 and 100 characters.",
          },
        },
        {
          id: "address_line2",
          label: "Apartment, Suite, etc.",
          type: "text",
          placeholder: "Optional",
          required: false,
        },
        {
          id: "city",
          label: "City",
          type: "text",
          required: true,
          validation: {
            pattern: "^[A-Za-z\\s]{2,50}$",
            message: "City name must be 2–50 letters.",
          },
        },
        {
          id: "postal_code",
          label: "Postal Code",
          type: "text",
          required: true,
          validation: {
            pattern: "^[0-9]{5}(?:-[0-9]{4})?$",
            message: "Enter a valid postal code.",
          },
        },
      ],
    },
    {
      stepId: "financial_info",
      title: "Financial Information",
      fields: [
        {
          id: "annual_income",
          label: "Annual Income",
          type: "number",
          placeholder: "Enter your income",
          required: true,
          validation: {
            min: 10000,
            max: 1000000,
            message: "Income must be between ₹10,000 and ₹10,00,000.",
          },
        },
        {
          id: "employment_status",
          label: "Employment Status",
          type: "select",
          required: true,
          options: [
            { value: "employed", label: "Employed" },
            { value: "self_employed", label: "Self-employed" },
            { value: "student", label: "Student" },
            { value: "unemployed", label: "Unemployed" },
            { value: "retired", label: "Retired" },
          ],
          validation: {
            message: "Please select your employment status.",
          },
        },
        {
          id: "credit_card_type",
          label: "Preferred Credit Card Type",
          type: "select",
          required: true,
          options: [
            { value: "platinum", label: "Platinum" },
            { value: "gold", label: "Gold" },
            { value: "silver", label: "Silver" },
            { value: "student", label: "Student Card" },
          ],
          validation: {
            message: "Please select a credit card type.",
          },
        },
      ],
    },
  ],
  submit: {
    label: "Submit Application",
    successMessage: "Your application has been submitted successfully!",
    errorMessage:
      "There was an error submitting your application. Please try again.",
    postSubmitAction:
      "Display virtual credit card design based on submitted details.",
  },
};
