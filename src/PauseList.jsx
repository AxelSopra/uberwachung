import React from "react";
import PropTypes from "prop-types";

const PAUSE_DURATION_MIN = 1;

function getRemainingMinutes(startTime) {
  const end = startTime.toMillis() + PAUSE_DURATION_MIN * 60 * 1000;
  const now = Date.now();
  return Math.max(0, Math.ceil((end - now) / 60000));
}

export default function PauseList({ pauses }) {
  return (
    <ul className="list-group list-pauses">
      {pauses.map(p => (
        <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
          <span className="text-muted small">{p.name || p.uid}</span>
          <span>{getRemainingMinutes(p.startTime)} min restantes</span>
        </li>
      ))}
    </ul>
  );
}

PauseList.propTypes = {
  pauses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    uid: PropTypes.string.isRequired,
    startTime: PropTypes.object.isRequired
  })).isRequired
};

