import React from "react";
import "./Heading.css";

export default function Heading({ num, title }) {
  return (
    <header className="section-heading reveal">
      <span className="section-heading-num">{num}</span>
      <h2 className="section-heading-title">{title}</h2>
    </header>
  );
}
