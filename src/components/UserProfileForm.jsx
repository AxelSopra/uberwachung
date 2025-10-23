import React from "react";
import { AVATAR_LIST, generateAnonymousName } from "../utils/constants";

export default function UserProfileForm({ userName, setUserName, userAvatar, setUserAvatar, avatarList = AVATAR_LIST }) {
  return (
    <div className="card mb-4 mx-auto" style={{maxWidth: 400}}>
      <div className="card-body">
        <h5 className="mb-3">Choisis ton nom et ton avatar</h5>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={userName}
            onChange={e => {
              setUserName(e.target.value);
              localStorage.setItem("userName", e.target.value);
            }}
            maxLength={24}
            placeholder="Nom anonyme"
          />
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {avatarList.map(a => (
            <button
              key={a}
              type="button"
              className={`btn btn-light m-1 ${userAvatar === a ? "border-primary" : ""}`}
              style={{fontSize: "2rem", borderWidth: 2}}
              onClick={() => {
                setUserAvatar(a);
                localStorage.setItem("userAvatar", a);
              }}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

UserProfileForm.getInitialName = function() {
  let name = localStorage.getItem("userName");
  if (!name) {
    name = generateAnonymousName();
    localStorage.setItem("userName", name);
  }
  return name;
};
UserProfileForm.getInitialAvatar = function() {
  let avatar = localStorage.getItem("userAvatar");
  if (!avatar) {
    avatar = AVATAR_LIST[Math.floor(Math.random() * AVATAR_LIST.length)];
    localStorage.setItem("userAvatar", avatar);
  }
  return avatar;
};
UserProfileForm.getInitialId = function() {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("userId", userId);
  }
  return userId;
};

