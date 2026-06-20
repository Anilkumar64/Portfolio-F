import React from "react";
import "./Sec.css";

export default function Sec({ id, children }) {
  return (
    <section id={id} className="sec">
      {children}
    </section>
  );
}
