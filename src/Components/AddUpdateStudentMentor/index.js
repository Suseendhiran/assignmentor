import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { addStudentMentorSchema } from "../../helpers/validationSchema";

import { useToasts } from "react-toast-notifications";
import { useLoader } from "../../Providers/LoaderProvider";
import axios from "../../Api/Api";

function Index() {
  const { addToast } = useToasts();
  const { setLoading } = useLoader();
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const INPUTS = [
    {
      name: "studentId",
      type: "select",
      label: "Select Student",
      options: students.map((student) => {
        return {
          value: student._id,
          label: student.name,
        };
      }),
    },
    {
      name: "mentorId",
      type: "select",
      label: "Select Mentor",
      options: mentors.map((mentor) => {
        return {
          value: mentor._id,
          label: mentor.name,
        };
      }),
    },
  ];
  const getStudents = async () => {
    setLoading(true);
    await axios
      .get("/students/list")
      .then((res) => {
        setLoading(false);
        setStudents(res.data);
      })
      .catch((err) => {
        setLoading(false);
        addToast(err.data.message, { appearance: "error" });
      });
  };
  const getMentors = async () => {
    setLoading(true);
    await axios
      .get("/mentors/list")
      .then((res) => {
        setLoading(false);
        setMentors(res.data);
      })
      .catch((err) => {
        setLoading(false);
        addToast(err.data.message, { appearance: "error" });
      });
  };
  const handleSubmit = async (values, resetForm) => {
    setLoading(true);
    await axios
      .put("/students/updatestudent", { ...values })
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

  useEffect(() => {
    getStudents();
    getMentors();
  }, []);

  return (
    <Formik
      initialValues={{
        studentId: "",
        mentorId: "",
      }}
      validationSchema={addStudentMentorSchema}
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
        );
      }}
    </Formik>
  );
}

export default Index;
