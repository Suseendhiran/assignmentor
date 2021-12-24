import React from "react";
import InputField from "../InputField";
import Button from "@mui/material/Button";
import { useToasts } from "react-toast-notifications";
import { Formik } from "formik";
import { useLoader } from "../../Providers/LoaderProvider";
import axios from "../../Api/Api";
import { addStudentSchema } from "../../helpers/validationSchema";

function Index() {
  const { addToast } = useToasts();
  const { setLoading } = useLoader();
  const INPUTS = [
    {
      name: "name",
      type: "text",
      label: "Full name",
    },
    {
      name: "age",
      type: "number",
      label: "Age",
    },
    {
      name: "gender",
      type: "select",
      label: "Gender",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      name: "collegeName",
      type: "text",
      label: "College Name",
    },
  ];
  const handleSubmit = (values, resetForm) => {
    setLoading(true);
    axios
      .post("/students/addstudent", {
        ...values,
      })
      .then((res) => {
        setLoading(false);
        resetForm();
        addToast(res.data.message, { appearance: "success" });
      })
      .catch((err) => {
        setLoading(false);
        addToast(err.data.message, { appearance: "error" });
      });
  };
  return (
    <Formik
      initialValues={{
        name: "",
        age: "",
        gender: "",
        collegeName: "",
      }}
      validationSchema={addStudentSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values, resetForm);
      }}
    >
      {({
        handleSubmit,
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        setFieldValue,
      }) => {
        return (
          <div className="formWrapper">
            <form className="formContainer" onSubmit={handleSubmit}>
              <h1 className="formTitle">Add Student</h1>

              {INPUTS.map((input, index) => (
                <InputField
                  input={input}
                  type={input.type}
                  name={input.name}
                  label={input.label}
                  onChange={handleChange}
                  OnBlur={handleBlur}
                  value={values[input.name]}
                  error={touched[input.name] && errors[input.name]}
                  onBlur={handleBlur}
                  key={index}
                  helperText={touched[input.name] ? errors[input.name] : ""}
                  setFieldValue={setFieldValue}
                />
              ))}
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default Index;
