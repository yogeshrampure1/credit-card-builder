import { useFormik } from "formik";
import * as Yup from "yup";

export interface IPersonalInformationProps {
  handlePersonalInfoSubmit: (s: IPersonalInfoFormik) => void;
  fields: any;
}
export interface IPersonalInfoFormik {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  dob: string;
}

const PersonalInformation: React.FC<IPersonalInformationProps> = ({
  handlePersonalInfoSubmit,
  fields,
}) => {
  const personalInfoFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      phone: "",
      dob: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[A-Za-z]{2,50}$/, "First name must be 2–50 letters only.")
        .required("Required"),
      lastName: Yup.string()
        .matches(/^[A-Za-z]{2,50}$/, "Last name must be 2–50 letters only.")
        .required("Required"),
      middleName: Yup.string()
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

  console.log(fields);
  return (
    <div>
      <h1>Personal Information</h1>
      <form onSubmit={personalInfoFormik.handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>First Name</label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            value={personalInfoFormik.values.firstName}
            onChange={personalInfoFormik.handleChange}
            onBlur={personalInfoFormik.handleBlur}
          />
          {personalInfoFormik.touched.firstName &&
            personalInfoFormik.errors.firstName && (
              <div style={{ color: "red" }}>
                {personalInfoFormik.errors.firstName}
              </div>
            )}

          <label>Last Name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={personalInfoFormik.values.lastName}
            onChange={personalInfoFormik.handleChange}
            onBlur={personalInfoFormik.handleBlur}
          />
          {personalInfoFormik.touched.lastName &&
            personalInfoFormik.errors.lastName && (
              <div style={{ color: "red" }}>
                {personalInfoFormik.errors.lastName}
              </div>
            )}

          <label>Middle Name</label>
          <input
            id="middleName"
            type="text"
            placeholder="Middle Name"
            value={personalInfoFormik.values.middleName}
            onChange={personalInfoFormik.handleChange}
            onBlur={personalInfoFormik.handleBlur}
          />
          {personalInfoFormik.touched.middleName &&
            personalInfoFormik.errors.middleName && (
              <div style={{ color: "red" }}>
                {personalInfoFormik.errors.middleName}
              </div>
            )}

          <label>Email</label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            value={personalInfoFormik.values.email}
            onChange={personalInfoFormik.handleChange}
            onBlur={personalInfoFormik.handleBlur}
          />
          {personalInfoFormik.touched.email &&
            personalInfoFormik.errors.email && (
              <div style={{ color: "red" }}>
                {personalInfoFormik.errors.email}
              </div>
            )}

          <label>Phone</label>
          <input
            id="phone"
            type="text"
            placeholder="Phone"
            value={personalInfoFormik.values.phone}
            onChange={personalInfoFormik.handleChange}
            onBlur={personalInfoFormik.handleBlur}
          />
          {personalInfoFormik.touched.phone &&
            personalInfoFormik.errors.phone && (
              <div style={{ color: "red" }}>
                {personalInfoFormik.errors.phone}
              </div>
            )}

          <label>Date of Birth</label>
          <input
            id="dob"
            type="text"
            placeholder="YYYY-MM-DD"
            value={personalInfoFormik.values.dob}
            onChange={personalInfoFormik.handleChange}
            onBlur={personalInfoFormik.handleBlur}
          />
          {personalInfoFormik.touched.dob && personalInfoFormik.errors.dob && (
            <div style={{ color: "red" }}>{personalInfoFormik.errors.dob}</div>
          )}
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default PersonalInformation;
