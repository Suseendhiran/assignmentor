import React from "react";
import InputField from "../InputField";
import Button from "@mui/material/Button";
import { useToasts } from "react-toast-notifications";
import { Formik } from "formik";
import { addMentorSchema } from "../../helpers/validationSchema";
import { useLoader } from "../../Providers/LoaderProvider";
import axios from "../../Api/Api";

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
      name: "skills",
      type: "multiSelect",
      label: "skills",
      options: [
        { label: "Javascript", value: "javascript" },
        { label: "Python", value: "python" },
        { label: "React js", value: "reactJs" },
        { label: "Node js", value: "nodejs" },
        { label: "AWS", value: "aws" },
        { label: "Cloud Computing", value: "cloudComputing" },
        { label: "SEO", value: "seo" },
        { label: "Digital Marketing", value: "digitalMarketing" },
        { label: "Mobile App Development", value: "mobileAppDevelopment" },
      ],
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
    const payload = {
      ...values,
      skills: values.skills.map((skill) => skill.value),
    };
    setLoading(true);
    axios
      .post("/mentors/addmentor", {
        ...payload,
      })
      .then((res) => {
        setLoading(false);
        addToast(res.data.message, { appearance: "success" });
        resetForm();
      })
      .catch((err) => {
        setLoading(false);
        addToast(err.data.message, { appearance: "success" });
      });
  };
  return (
    <Formik
      initialValues={{
        name: "",
        age: "",
        gender: "",
        skills: [],
        collegeName: "",
      }}
      validationSchema={addMentorSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("valuesfinal", values);
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
              <h1 className="formTitle">Add Mentor</h1>

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
