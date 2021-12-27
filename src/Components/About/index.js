import React from "react";
import { Link } from "@reach/router";

function index() {
  const contents = [
    { title: "Add Mentor", function: "Add mentor details", path: "addmentor" },
    {
      title: "Add Student",
      function: "Add Student details",
      path: "addstudent",
    },
    {
      title: "Assign Mentor",
      function: "Assign mentor to a student",
      path: "addupdatestudentmentor",
    },
    {
      title: "Assign Students",
      function: "Assign one or multiple students to a mentor",
      path: "addstudentstomentor",
    },
  ];
  return (
    <div className="aboutContainer">
      <h1 className="aboutHead">App to Maintain Mentors and Students data</h1>
      <p className="aboutPara">Functions</p>
      <div className="functions">
        {contents.map((content) => (
          <>
            <Link to={`/${content.path}`}>
              {content.title} : <span>{content.function}</span>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}

export default index;
