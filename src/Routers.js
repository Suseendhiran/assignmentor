import React from "react";
import { Router } from "@reach/router";
import AddStudent from "./Components/AddStudent";
import AddMentor from "./Components/AddMentor";
import AddUpdateStudentMentor from "./Components/AddUpdateStudentMentor";
import AddStudentsToMentor from "./Components/AddStudentsToMentor";

function Routers() {
  return (
    <Router>
      <AddStudent path="/addstudent" />
      <AddMentor path="/addmentor" />
      <AddUpdateStudentMentor path="/addupdatestudentmentor" />
      <AddStudentsToMentor path="addstudentstomentor" />
    </Router>
  );
}

export default Routers;
