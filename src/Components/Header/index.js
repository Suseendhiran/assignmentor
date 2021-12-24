import { Link } from "@reach/router";
import React from "react";
import AppBar from "@mui/material/AppBar";

function index() {
  const links = [
    { path: "addmentor", title: "Add Mentor" },
    { path: "addstudent", title: "Add student" },
    { path: "addupdatestudentmentor", title: "Assign Mentor" },
    { path: "addstudentstomentor", title: "Assign Students" },
  ];
  return (
    <div className="header">
      <nav className="headerContainer">
        {links.map((link) => (
          <Link
            getProps={({ isCurrent }) => {
              return {
                style: {
                  color: isCurrent ? "black" : "white",
                  backgroundColor: isCurrent ? "white" : "transparent",
                  padding: "7px",
                  borderRadius: "10px",
                },
              };
            }}
            to={`/${link.path}`}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default index;
