import React from "react";
import PropTypes from "prop-types";
import "./App.css";

export default function PauseLight({ color }) {
  return (
    <div className={`feu-pause ${color}`}/>
  );
}

PauseLight.propTypes = {
  color: PropTypes.oneOf(["green", "orange", "red"]).isRequired
};

