import React, { useState } from "react";
import "./App.css";
import PauseLight from "./components/PauseLight";
import UserPause from "./components/UserPause";
import PauseList from "./components/PauseList";
import usePauses from "./hooks/usePauses";
import UserProfileForm from "./components/UserProfileForm";
import { AVATAR_LIST, MAX_PAUSES } from "./utils/constants";

export default function App() {
  // Gestion du profil utilisateur
  const [userName, setUserName] = useState(UserProfileForm.getInitialName());
  const [userAvatar, setUserAvatar] = useState(UserProfileForm.getInitialAvatar());
  const [userId] = useState(UserProfileForm.getInitialId());

  // Gestion des pauses
  const {
    pauses,
    userPause,
    userPausesThisHalfDay,
    remaining,
    canTakePause,
    handlePause
  } = usePauses({ userId, userName, userAvatar });

  return (
    <div className="text-center mt-5">
      <div className="container-row">
        <div className="profile-form">
          <UserProfileForm
            userName={userName}
            setUserName={setUserName}
            userAvatar={userAvatar}
            setUserAvatar={setUserAvatar}
            avatarList={AVATAR_LIST}
          />
        </div>
        <div className="card card-feu shadow-sm">
          <div className="card-body">
            <h1 className="mb-4">Feu Pause Téléconseillers</h1>
            <div className="d-flex justify-content-center mb-4">
              <PauseLight color={pauses.length >= MAX_PAUSES ? "red" : pauses.length >= MAX_PAUSES - 1 ? "orange" : "green"} />
            </div>
            <button
              onClick={handlePause}
              disabled={!canTakePause}
              className="btn btn-primary btn-lg w-100 mb-3 btn-pause"
            >
              Je pars en pause
            </button>
            {userPause && <UserPause name={userPause.name} avatar={userPause.avatar} remaining={remaining} />}
            <div className="list-pauses mt-4">
              <h5 className="mb-3">Pauses en cours <span className="badge bg-secondary">{pauses.length}</span></h5>
              <PauseList pauses={pauses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
