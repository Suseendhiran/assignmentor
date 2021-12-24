import * as yup from "yup";
const addStudentSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is Required")
    .matches(/^[a-zA-Z ]+$/, "Should contain only Alphabets"),
  age: yup.string().required("Age is Required"),

  gender: yup.string().required("Gender is Required"),
  collegeName: yup.string().required("College Name is Required"),
});

const addMentorSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is Required")
    .matches(/^[a-zA-Z ]+$/, "Should contain only Alphabets"),
  age: yup.string().required("Age is Required"),
  skills: yup.array().min(1).required("Skills are required"),
  gender: yup.string().required("Gender is Required"),
  collegeName: yup.string().required("College Name is Required"),
});

const addStudentMentorSchema = yup.object().shape({
  studentId: yup.string().required("Student is Required"),
  mentorId: yup.string().required("Mentor is Required"),
});

const addStudentsToMentorSchema = yup.object().shape({
  mentorId: yup.string().required("Student is Required"),
  studentIds: yup.array().min(1).required("Mentor is Required"),
});

export {
  addStudentSchema,
  addMentorSchema,
  addStudentMentorSchema,
  addStudentsToMentorSchema,
};
