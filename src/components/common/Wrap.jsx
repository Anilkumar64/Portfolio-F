import React from "react";
import "./Wrap.css";

export default function Wrap({ children }) {
  return (
    <div className="wrap">
      {children}
    </div>
  );
}
