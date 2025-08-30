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
  const [fields, setFields] = useState<any>([]);
  const [personalInfo, setPersonalInfo] = useState<any>([]);
  const [addressInfo, setAddressInfo] = useState<any>([]);
  const [financialInfo, setFinancialInfo] = useState<any>([]);
  const [personalInfoComplete, setPersonalInfoComplete] = useState(false);
  const [addressInfoComplete, setAddressInfoComplete] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const lastSubmittedId = localStorage.getItem("submissionId");

  const handlePersonalInfoSubmit = (s: IPersonalInfoFormik) => {
    setPersonalInfo(s);
    setPersonalInfoComplete(true);
    setStepId("address_info");
    setFields(steps[1].fields); // Set fields for address_info step
  };

  const handleAddressInfoSubmit = (s: IAddressInfoFormik) => {
    setAddressInfo(s);
    setAddressInfoComplete(true);
    setStepId("financial_info");
    setFields(steps[2].fields); // Set fields for address_info step
  };

  const handleFinancialInfoSubmit = async (s: IFinancialInfoFormik) => {
    const payload = {
      personalInfo: { ...personalInfo },
      addressInfo: { ...addressInfo },
      financialInfo: { ...s },
    };
    // await SubmitEvent(payload);

    console.log(payload);

    localStorage.setItem("submissionId", JSON.stringify(Math.random()));

    setSuccessMessage(true);
    setStepId("personal_info");
    setFields(steps[0].fields);
    setPersonalInfo([]);
    setAddressInfo([]);
    setFinancialInfo([]);
    setPersonalInfoComplete(false);
    setAddressInfoComplete(false);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 5000);
  };

  const handleBack = (toStep: string) => {
    setStepId(toStep);
    if (toStep === "personal_info") {
      setFields(steps[0].fields);
    } else if (toStep === "address_info") {
      setFields(steps[1].fields);
    }
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
      <h1>Credit Card Application</h1>
      <p>Please fill in the details to apply for a credit card.</p>

      {lastSubmittedId && (
        <p style={{ color: "blue" }}>
          {"Last submission ID: " + lastSubmittedId}
        </p>
      )}
      {successMessage && (
        <p style={{ color: "green" }}>{"Data filled successfully"}</p>
      )}
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
            personalInfo={personalInfo}
            handlePersonalInfoSubmit={handlePersonalInfoSubmit}
            fields={fields}
          />
        )}
      </div>
      <div>
        {stepId === "address_info" && personalInfoComplete && (
          <AddressInfo
            addressInfo={addressInfo}
            handleAddressInfoSubmit={handleAddressInfoSubmit}
            fields={fields}
            handleBack={() => handleBack("personal_info")}
          />
        )}
      </div>
      <div>
        {stepId === "financial_info" &&
          personalInfoComplete &&
          addressInfoComplete && (
            <FinancialInfo
              financialInfo={financialInfo}
              handleFinancialInfoSubmit={handleFinancialInfoSubmit}
              fields={fields}
              handleBack={() => handleBack("address_info")}
            />
          )}
      </div>
    </main>
  );
}
