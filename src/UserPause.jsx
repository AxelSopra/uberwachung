import React from "react";
import PropTypes from "prop-types";

export default function UserPause({ name, remaining }) {
  return (
    <div className="alert alert-info mt-3">
      <strong>Votre nom anonyme : </strong>{name}<br/>
      <strong>Temps restant : </strong>{remaining} min
    </div>
  );
}

UserPause.propTypes = {
  name: PropTypes.string.isRequired,
  remaining: PropTypes.number.isRequired
};

