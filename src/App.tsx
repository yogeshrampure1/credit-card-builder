import { useState } from "react";
import { mockdata } from "./mockdata";
import PersonalInformation, {
  type IPersonalInfoFormik,
} from "./components/PersonalInformation";
import FinancialInfo, {
  type IFinancialInfoFormik,
} from "./components/FinancialInfo";
import AddressInfo, { type IAddressInfoFormik } from "./components/AddressInfo";

export default function App() {
  const { steps } = mockdata;
  const [stepId, setStepId] = useState("personal_info");
  const [fields, setFields] = useState({});
  const [personalInfoComplete, setPersonalInfoComplete] = useState(false);
  const [addressInfoComplete, setAddressInfoComplete] = useState(false);

  const handlePersonalInfoSubmit = (s: IPersonalInfoFormik) => {
    console.log(s);
    setPersonalInfoComplete(true);
    setStepId("address_info");
  };

  const handleAddressInfoSubmit = (s: IAddressInfoFormik) => {
    console.log(s);
    setAddressInfoComplete(true);
    setStepId("financial_info");
  };

  const handleFinancialInfoSubmit = (s: IFinancialInfoFormik) => {
    console.log(s);
    // Optionally show a completion message or reset
  };

  return (
    <main
      style={{
        padding: "10px",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {steps.map((step) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              justifyItems: "center",
            }}
            key={step.stepId}
          >
            <h5
              style={{
                cursor:
                  step.stepId === "personal_info" ||
                  (step.stepId === "address_info" && personalInfoComplete) ||
                  (step.stepId === "financial_info" &&
                    personalInfoComplete &&
                    addressInfoComplete)
                    ? "pointer"
                    : "not-allowed",
                fontSize: step.stepId === stepId ? "16px" : "",
                opacity:
                  step.stepId === "personal_info" ||
                  (step.stepId === "address_info" && personalInfoComplete) ||
                  (step.stepId === "financial_info" &&
                    personalInfoComplete &&
                    addressInfoComplete)
                    ? 1
                    : 0.5,
              }}
              onClick={() => {
                if (
                  step.stepId === "personal_info" ||
                  (step.stepId === "address_info" && personalInfoComplete) ||
                  (step.stepId === "financial_info" &&
                    personalInfoComplete &&
                    addressInfoComplete)
                ) {
                  setStepId(step.stepId);
                  setFields(step.fields); // Update fields when step changes
                }
              }}
            >
              {step.title}
            </h5>
          </div>
        ))}
      </div>

      <div>
        {stepId === "personal_info" && (
          <PersonalInformation
            handlePersonalInfoSubmit={handlePersonalInfoSubmit}
            fields={fields}
          />
        )}
      </div>
      <div>
        {stepId === "address_info" && personalInfoComplete && (
          <AddressInfo handleAddressInfoSubmit={handleAddressInfoSubmit} />
        )}
      </div>
      <div>
        {stepId === "financial_info" &&
          personalInfoComplete &&
          addressInfoComplete && (
            <FinancialInfo
              handleFinancialInfoSubmit={handleFinancialInfoSubmit}
            />
          )}
      </div>
    </main>
  );
}
