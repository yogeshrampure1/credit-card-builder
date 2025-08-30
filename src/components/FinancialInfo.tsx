import { useFormik } from "formik";
import * as Yup from "yup";

export interface IFinancialInfoProps {
  financialInfo: any;
  handleFinancialInfoSubmit: (s: IFinancialInfoFormik) => void;
  fields: any[];
  handleBack: () => void;
}

export interface IFinancialInfoFormik {
  annual_income: string;
  employment_status: string;
  credit_card_type: string;
}

const FinancialInfo: React.FC<IFinancialInfoProps> = ({
  financialInfo,
  handleFinancialInfoSubmit,
  fields,
  handleBack,
}) => {
  const dynamicInitialValues =
    fields && fields.length > 0
      ? fields.reduce((acc: any, field: any) => {
          acc[field.id] = financialInfo[field.id] || "";
          return acc;
        }, {})
      : {};
  const financialInfoFormik = useFormik({
    initialValues: dynamicInitialValues,
    validationSchema: Yup.object({
      annual_income: Yup.number()
        .typeError("Annual Income must be a number")
        .min(10000, "Income must be between ₹10,000 and ₹10,00,000.")
        .max(1000000, "Income must be between ₹10,000 and ₹10,00,000.")
        .required("Required"),
      employment_status: Yup.string().required(
        "Please select your employment status."
      ),
      credit_card_type: Yup.string().required(
        "Please select a credit card type."
      ),
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
                {field.type === "select" && (
                  <select
                    id={field.id}
                    value={financialInfoFormik.values[field.id]}
                    onChange={financialInfoFormik.handleChange}
                    onBlur={financialInfoFormik.handleBlur}
                  >
                    {field.options.map((option: any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
                {field.type !== "select" && (
                  <input
                    id={field.id}
                    type="text"
                    value={financialInfoFormik.values[field.id]}
                    placeholder={field.placeholder}
                    onChange={financialInfoFormik.handleChange}
                    onBlur={financialInfoFormik.handleBlur}
                  />
                )}
                {financialInfoFormik.touched[field.id] &&
                  typeof financialInfoFormik.errors[field.id] === "string" && (
                    <div style={{ color: "red" }}>
                      <>{financialInfoFormik.errors[field.id]}</>
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
            disabled={!financialInfoFormik.isValid}
            style={{ marginTop: "1rem", border: "2px solid" }}
            onClick={() =>
              handleFinancialInfoSubmit(financialInfoFormik.values)
            }
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinancialInfo;
