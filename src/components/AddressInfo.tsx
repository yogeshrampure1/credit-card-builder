import { useFormik } from "formik";
import * as Yup from "yup";

export interface IAddressInfoProps {
  handleAddressInfoSubmit: (s: IAddressInfoFormik) => void;
}

export interface IAddressInfoFormik {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
}

const AddressInfo: React.FC<IAddressInfoProps> = ({
  handleAddressInfoSubmit,
}) => {
  const addressInfoFormik = useFormik({
    initialValues: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
    },
    validationSchema: Yup.object({
      addressLine1: Yup.string()
        .min(5, "Address Line 1 must be at least 5 characters")
        .max(100, "Address Line 1 must be at most 100 characters")
        .required("Required"),
      addressLine2: Yup.string()
        .max(100, "Address Line 2 must be at most 100 characters")
        .notRequired(),
      city: Yup.string()
        .min(2, "City must be at least 2 characters")
        .max(50, "City must be at most 50 characters")
        .required("Required"),
      state: Yup.string()
        .min(2, "State must be at least 2 characters")
        .max(50, "State must be at most 50 characters")
        .required("Required"),
      zip: Yup.string()
        .matches(/^\d{5,6}$/, "ZIP must be 5 or 6 digits")
        .required("Required"),
    }),
    onSubmit: (values) => {
      handleAddressInfoSubmit(values);
    },
  });

  return (
    <div>
      <h1>Address Information</h1>
      <form
        onSubmit={addressInfoFormik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <label>Address Line 1</label>
        <input
          id="addressLine1"
          type="text"
          placeholder="Address Line 1"
          value={addressInfoFormik.values.addressLine1}
          onChange={addressInfoFormik.handleChange}
          onBlur={addressInfoFormik.handleBlur}
        />
        {addressInfoFormik.touched.addressLine1 &&
          addressInfoFormik.errors.addressLine1 && (
            <div style={{ color: "red" }}>
              {addressInfoFormik.errors.addressLine1}
            </div>
          )}

        <label>Address Line 2</label>
        <input
          id="addressLine2"
          type="text"
          placeholder="Address Line 2"
          value={addressInfoFormik.values.addressLine2}
          onChange={addressInfoFormik.handleChange}
          onBlur={addressInfoFormik.handleBlur}
        />
        {addressInfoFormik.touched.addressLine2 &&
          addressInfoFormik.errors.addressLine2 && (
            <div style={{ color: "red" }}>
              {addressInfoFormik.errors.addressLine2}
            </div>
          )}

        <label>City</label>
        <input
          id="city"
          type="text"
          placeholder="City"
          value={addressInfoFormik.values.city}
          onChange={addressInfoFormik.handleChange}
          onBlur={addressInfoFormik.handleBlur}
        />
        {addressInfoFormik.touched.city && addressInfoFormik.errors.city && (
          <div style={{ color: "red" }}>{addressInfoFormik.errors.city}</div>
        )}

        <label>State</label>
        <input
          id="state"
          type="text"
          placeholder="State"
          value={addressInfoFormik.values.state}
          onChange={addressInfoFormik.handleChange}
          onBlur={addressInfoFormik.handleBlur}
        />
        {addressInfoFormik.touched.state && addressInfoFormik.errors.state && (
          <div style={{ color: "red" }}>{addressInfoFormik.errors.state}</div>
        )}

        <label>ZIP</label>
        <input
          id="zip"
          type="text"
          placeholder="ZIP"
          value={addressInfoFormik.values.zip}
          onChange={addressInfoFormik.handleChange}
          onBlur={addressInfoFormik.handleBlur}
        />
        {addressInfoFormik.touched.zip && addressInfoFormik.errors.zip && (
          <div style={{ color: "red" }}>{addressInfoFormik.errors.zip}</div>
        )}

        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default AddressInfo;
