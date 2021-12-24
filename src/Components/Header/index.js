import { Link } from "@reach/router";
import React from "react";
import AppBar from "@mui/material/AppBar";

function index() {
  return (
    <div className="header">
      <nav className="headerContainer">
        <Link to="/addmentor">Add Mentor</Link>
        <Link to="/addstudent">Add student</Link>
        <Link to="/addupdatestudentmentor">Add Student Mentor</Link>
        <Link to="/addstudentstomentor">Add Mentor Students</Link>
      </nav>
    </div>
  );
}

export default index;
