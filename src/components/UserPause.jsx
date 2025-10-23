import React from "react";
import PropTypes from "prop-types";

export default function UserPause({ name, avatar, remaining }) {
  return (
    <div className="alert alert-info mt-3">
      <strong>Votre nom anonyme : </strong>
      <span style={{fontSize: "1.5rem", marginRight: 8}}>{avatar}</span>
      {name}<br/>
      <strong>Temps restant : </strong>{remaining} min
    </div>
  );
}

UserPause.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  remaining: PropTypes.number.isRequired
};

