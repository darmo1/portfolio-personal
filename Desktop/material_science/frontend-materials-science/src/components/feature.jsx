import React from "react";

const feature = ({ color, text }) => {
  return (
    <li style={{ background: color }}>
      {text}
    </li>
  );
};

export default feature;
