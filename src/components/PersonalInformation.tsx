import { useFormik } from "formik";
import * as Yup from "yup";

export interface IPersonalInformationProps {
  personalInfo: any;
  handlePersonalInfoSubmit: (s: IPersonalInfoFormik) => void;
  fields: any[];
}
export interface IPersonalInfoFormik {
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone: string;
  dob: string;
}

const PersonalInformation: React.FC<IPersonalInformationProps> = ({
  personalInfo,
  handlePersonalInfoSubmit,
  fields,
}) => {
  const dynamicInitialValues =
    fields && fields.length > 0
      ? fields.reduce((acc: any, field: any) => {
          acc[field.id] = personalInfo[field.id] || "";
          return acc;
        }, {})
      : {};

  const personalInfoFormik = useFormik({
    initialValues: dynamicInitialValues,
    validationSchema: Yup.object({
      first_name: Yup.string()
        .matches(/^[A-Za-z]{2,50}$/, "First name must be 2–50 letters only.")
        .required("Required"),
      last_name: Yup.string()
        .matches(/^[A-Za-z]{2,50}$/, "Last name must be 2–50 letters only.")
        .required("Required"),
      middle_name: Yup.string()
        .matches(
          /^[A-Za-z]{0,50}$/,
          "Middle name must be up to 50 letters only."
        )
        .notRequired(),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone must be 10 digits.")
        .required("Required"),
      dob: Yup.string()
        .matches(
          /^\d{4}-\d{2}-\d{2}$/,
          "Date of Birth must be in YYYY-MM-DD format."
        )
        .required("Required"),
    }),
    onSubmit: (values) => {
      handlePersonalInfoSubmit(values);
    },
  });

  return (
    <div>
      <h1>Personal Information</h1>
      <form onSubmit={personalInfoFormik.handleSubmit}>
        {fields.length > 0 &&
          fields.map((field: any) => {
            return (
              <div
                key={field.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "8px",
                }}
              >
                {field.label}
                <input
                  id={field.id}
                  type="text"
                  value={personalInfoFormik.values[field.id]}
                  placeholder={field.placeholder}
                  onChange={personalInfoFormik.handleChange}
                  onBlur={personalInfoFormik.handleBlur}
                />
                {personalInfoFormik.touched[field.id] &&
                  typeof personalInfoFormik.errors[field.id] === "string" && (
                    <div style={{ color: "red" }}>
                      <>{personalInfoFormik.errors[field.id]}</>
                    </div>
                  )}
              </div>
            );
          })}
        <button
          disabled={!personalInfoFormik.isValid}
          style={{ marginTop: "1rem", border: "2px solid" }}
          onClick={() => handlePersonalInfoSubmit(personalInfoFormik.values)}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default PersonalInformation;
