// @ts-nocheck
import { JsonForms } from "@jsonforms/react";
import { schema as originalSchema, uischema } from "./assessmentSchema";
import { useState } from "react";
import { materialRenderers } from "@jsonforms/material-renderers";
import { loadLeadsData, saveLeadsData } from "./uitls";
import CustomTextarea from "./CustomTextarea";

export default function AssessmentForm({}) {
  const customRenderers = [
    ...materialRenderers,
    {
      tester: (uischema) =>
        uischema.scope === "#/properties/helpText" ? 5 : -1,
      renderer: CustomTextarea,
    },
  ];
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [resume, setResume] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState([]);
  const [touched, setTouched] = useState({});

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setResume(e.target.result); // Set the base64 string of the file
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSaveData = (submissionData) => {
    const leadsData = loadLeadsData();
    leadsData.push({
      ...submissionData,
      submittedTime: new Date().toLocaleString(),
      status: "PENDING",
    });
    saveLeadsData(leadsData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Only submit if form is valid
    if (isFormValid) {
      const submissionData = { ...formData, resume };

      console.log("Form submitted: ", submissionData); // You can replace this with actual submission logic
      handleSaveData(submissionData); // Pass the data to the parent component
      setSubmitted(true);
    } else {
      console.log("Form is not valid, cannot submit");
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        countryOfCitizenship: true,
        linkedinUrl: true,
        visaCategory: true,
        helpText: true,
        resume: true,
      });
    }
  };

  const handleValidation = ({ errors }) => {
    setErrors(errors);
    setIsFormValid(errors.length === 0);
  };

  const showError = (field) => {
    return (
      touched[field] &&
      errors.some((error) => error.instancePath.includes(field))
    );
  };

  if (submitted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-lg p-10 rounded-md text-center">
          <h1 className="text-2xl font-semibold">Thank You</h1>
          <p className="mt-4 text-gray-700">
            Your information was submitted to our team of immigration attorneys.
            Expect an email from hello@alma.ai.
          </p>
          <button
            className="mt-8 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setSubmitted(false)}
          >
            Go Back to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-10 rounded-md w-full max-w-lg"
      >
        <h1 className="text-3xl font-semibold text-center mb-8">
          Get An Assessment Of Your Immigration Case
        </h1>
        <JsonForms
          schema={originalSchema}
          uischema={uischema}
          data={formData}
          onChange={({ data, errors }) => {
            setFormData(data);
            handleValidation({ errors });
          }}
          onBlur={(event) => handleBlur(event.target.name)}
          renderers={customRenderers}
        />
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Resume/CV
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            onBlur={() => handleBlur("resume")}
            className="w-full px-3 py-2 border rounded-md"
          />
          {showError("resume") && (
            <p className="text-red-500 mt-2">Please upload your resume.</p>
          )}
        </div>

        <button
          type="submit"
          className={`mt-8 w-full px-6 py-3 text-white rounded-md ${
            isFormValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
