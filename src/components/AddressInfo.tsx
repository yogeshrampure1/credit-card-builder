import { useFormik } from "formik";
import * as Yup from "yup";

export interface IAddressInfoProps {
  addressInfo: any;
  handleAddressInfoSubmit: (s: IAddressInfoFormik) => void;
  fields: any[];
  handleBack: () => void;
}

export interface IAddressInfoFormik {
  address_line1: string;
  address_line2: string;
  city: string;
  postal_code: string;
}

const AddressInfo: React.FC<IAddressInfoProps> = ({
  addressInfo,
  handleAddressInfoSubmit,
  fields,
  handleBack,
}) => {
  const dynamicInitialValues =
    fields && fields.length > 0
      ? fields.reduce((acc: any, field: any) => {
          acc[field.id] = addressInfo[field.id] || "";
          return acc;
        }, {})
      : {};

  const addressInfoFormik = useFormik({
    initialValues: dynamicInitialValues,
    validationSchema: Yup.object({
      address_line1: Yup.string()
        .min(5, "Street address must be between 5 and 100 characters.")
        .max(100, "Street address must be between 5 and 100 characters.")
        .required("Required"),
      address_line2: Yup.string()
        .max(100, "Address Line 2 must be at most 100 characters")
        .notRequired(),
      city: Yup.string()
        .matches(/^[A-Za-z]{2,50}$/, "City name must be 2–50 letters.")
        .required("Required"),
      postal_code: Yup.string()
        .matches(/^\d{5,6}$/, "Enter a valid postal code.")
        .required("Required"),
    }),
    onSubmit: (values) => {
      handleAddressInfoSubmit(values);
    },
  });

  return (
    <div>
      <h1>Address Information</h1>
      <form onSubmit={addressInfoFormik.handleSubmit}>
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
                  value={addressInfoFormik.values[field.id]}
                  placeholder={field.placeholder}
                  onChange={addressInfoFormik.handleChange}
                  onBlur={addressInfoFormik.handleBlur}
                />
                {addressInfoFormik.touched[field.id] &&
                  typeof addressInfoFormik.errors[field.id] === "string" && (
                    <div style={{ color: "red" }}>
                      <>{addressInfoFormik.errors[field.id]}</>
                    </div>
                  )}
              </div>
            );
          })}

        <div style={{ flexDirection: "row", display: "flex", gap: "1rem" }}>
          <button
            style={{ marginTop: "1rem", border: "2px solid" }}
            onClick={() => handleBack()}
          >
            Back
          </button>

          <button
            disabled={!addressInfoFormik.isValid}
            style={{ marginTop: "1rem", border: "2px solid" }}
            onClick={() => handleAddressInfoSubmit(addressInfoFormik.values)}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressInfo;
