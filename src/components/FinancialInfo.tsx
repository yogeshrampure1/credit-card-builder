import { useFormik } from "formik";
import * as Yup from "yup";

export interface IFinancialInfoProps {
  handleFinancialInfoSubmit: (s: IFinancialInfoFormik) => void;
}

export interface IFinancialInfoFormik {
  annualIncome: string;
  employment_status: string;
  credit_card_type: string;
}

const FinancialInfo: React.FC<IFinancialInfoProps> = ({
  handleFinancialInfoSubmit,
}) => {
  const financialInfoFormik = useFormik({
    initialValues: {
      annualIncome: "",
      employment_status: "",
      credit_card_type: "",
    },
    validationSchema: Yup.object({
      annualIncome: Yup.number()
        .typeError("Annual Income must be a number")
        .min(10000, "Annual Income must be at least 10,000")
        .required("Required"),
      employment_status: Yup.string()
        .oneOf(
          ["employed", "self-employed", "student", "unemployed", "retired"],
          "Select a valid status"
        )
        .required("Required"),
      credit_card_type: Yup.string()
        .oneOf(
          ["silver", "gold", "platinum", "student"],
          "Select a valid card type"
        )
        .required("Required"),
    }),
    onSubmit: (values) => {
      handleFinancialInfoSubmit(values);
    },
  });

  return (
    <div>
      <h1>Financial Information</h1>
      <form
        onSubmit={financialInfoFormik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <label>Annual Income</label>
        <input
          id="annualIncome"
          type="text"
          placeholder="Annual Income"
          value={financialInfoFormik.values.annualIncome}
          onChange={financialInfoFormik.handleChange}
          onBlur={financialInfoFormik.handleBlur}
        />
        {financialInfoFormik.touched.annualIncome &&
          financialInfoFormik.errors.annualIncome && (
            <div style={{ color: "red" }}>
              {financialInfoFormik.errors.annualIncome}
            </div>
          )}

        <label>Employment Status</label>
        <select
          id="employment_status"
          value={financialInfoFormik.values.employment_status}
          onChange={financialInfoFormik.handleChange}
          onBlur={financialInfoFormik.handleBlur}
        >
          <option value="">Select Status</option>
          <option value="employed">Employed</option>
          <option value="self_employed">Self-Employed</option>
          <option value="student">Student</option>
          <option value="unemployed">Unemployed</option>
          <option value="retired">Retired</option>
        </select>
        {financialInfoFormik.touched.employment_status &&
          financialInfoFormik.errors.employment_status && (
            <div style={{ color: "red" }}>
              {financialInfoFormik.errors.employment_status}
            </div>
          )}

        <label>Credit Card Type</label>
        <select
          id="credit_card_type"
          value={financialInfoFormik.values.credit_card_type}
          onChange={financialInfoFormik.handleChange}
          onBlur={financialInfoFormik.handleBlur}
        >
          <option value="">Select Card Type</option>
          <option value="platinum">Platinum</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="student">Student</option>
        </select>
        {financialInfoFormik.touched.credit_card_type &&
          financialInfoFormik.errors.credit_card_type && (
            <div style={{ color: "red" }}>
              {financialInfoFormik.errors.credit_card_type}
            </div>
          )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FinancialInfo;
