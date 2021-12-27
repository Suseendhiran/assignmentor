import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { useToasts } from "react-toast-notifications";
import { useLoader } from "../../Providers/LoaderProvider";
import { addStudentsToMentorSchema } from "../../helpers/validationSchema";
import axios from "../../Api/Api";

function Index() {
  const { addToast } = useToasts();
  const { setLoading } = useLoader();
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);

  const INPUTS = [
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
    {
      name: "students",
      type: "multiSelect",
      label: "Students",
      options: students.map((student) => {
        return {
          value: student._id,
          label: student.name,
        };
      }),
      note: "List contains students without mentor",
    },
  ];
  const getStudents = async () => {
    setLoading(true);
    await axios
      .get("/students/list")
      .then((res) => {
        setLoading(false);
        setStudents(
          res.data.filter((student) => !student.hasOwnProperty("mentorId"))
        );
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
    const payload = {
      ...values,
      studentIds: values.students.map((student) => student.value),
    };
    delete payload.students;
    setLoading(true);
    await axios
      .put("/mentors/addstudents", { ...payload })
      .then((res) => {
        setLoading(false);
        addToast(res.data.message, { appearance: "success" });
        resetForm();
        getStudents();
      })
      .catch((err) => {
        setLoading(false);
        addToast(err.data.message, { appearance: "error" });
      });
    resetForm();
  };

  useEffect(() => {
    getStudents();
    getMentors();
  }, []);

  return (
    <Formik
      initialValues={{
        mentorId: "",
        students: [],
      }}
      enableReinitialize={true}
      validationSchema={addStudentsToMentorSchema}
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
        console.log("errors", errors);
        return (
          <div className="formWrapper">
            <form className="formContainer" onSubmit={handleSubmit}>
              <h1 className="formTitle">Assign Students</h1>

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
