import React from "react";
import { Redirect, Router } from "@reach/router";
import AddStudent from "./Components/AddStudent";
import AddMentor from "./Components/AddMentor";
import AddUpdateStudentMentor from "./Components/AddUpdateStudentMentor";
import AddStudentsToMentor from "./Components/AddStudentsToMentor";
import About from "./Components/About";

function Routers() {
  return (
    <Router className="router">
      <About path="/" />
      {/* <Redirect from="/" to="/addmentor" /> */}
      <AddStudent path="/addstudent" />
      <AddMentor path="/addmentor" />
      <AddUpdateStudentMentor path="/addupdatestudentmentor" />
      <AddStudentsToMentor path="addstudentstomentor" />
    </Router>
  );
}

export default Routers;
