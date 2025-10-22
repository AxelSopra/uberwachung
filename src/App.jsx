import React, { useEffect, useState } from "react";
import "./App.css";
import { db, ensureAnonymousSignIn } from "./firebase";
import { collection, addDoc, query, onSnapshot, serverTimestamp, orderBy, deleteDoc, doc } from "firebase/firestore";
import PauseLight from "./PauseLight";
import UserPause from "./UserPause";
import PauseList from "./PauseList";

const PAUSE_DURATION_MIN = 1;
const MAX_PAUSES = 4;

function generateAnonymousName() {
  const animals = ["Aigle", "Tigre", "Loup", "Renard", "Panthère", "Ours", "Lynx", "Cerf", "Héron", "Chouette", "Dauphin", "Panda", "Zèbre", "Koala", "Gazelle"];
  const colors = ["bleu", "rouge", "vert", "jaune", "noir", "blanc", "gris", "orange", "violet", "rose", "marron", "argenté", "doré", "turquoise", "sable"];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return `${animal} ${color}`;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [pauses, setPauses] = useState([]);
  const [userPause, setUserPause] = useState(null);
  const [remaining, setRemaining] = useState(0);

  // Connexion anonyme
  useEffect(() => {
    ensureAnonymousSignIn().then(setUser);
  }, []);

  // Écoute Firestore
  useEffect(() => {
    const q = query(collection(db, "pauses"), orderBy("startTime", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const now = Date.now();
      const active = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(p => now < p.startTime.toMillis() + PAUSE_DURATION_MIN * 60 * 1000);
      setPauses(active);
      // Pause de l'utilisateur en cours
      const myPause = active.find(p => p.uid === user?.uid);
      setUserPause(myPause || null);
      if (myPause) {
        const end = myPause.startTime.toMillis() + PAUSE_DURATION_MIN * 60 * 1000;
        setRemaining(Math.max(0, Math.ceil((end - now) / 60000)));
      } else {
        setRemaining(0);
      }
    });
    return unsubscribe;
  }, [user]);

  // Suppression automatique de la pause après 15 min
  useEffect(() => {
    if (!userPause) return;
    const end = userPause.startTime.toMillis() + PAUSE_DURATION_MIN * 60 * 1000;
    const timeout = setTimeout(async () => {
      // Suppression de la pause
      await deleteDoc(doc(db, "pauses", userPause.id));
    }, end - Date.now());
    return () => clearTimeout(timeout);
  }, [userPause]);

  const handlePause = async () => {
    if (!user || userPause) return;
    const anonymousName = generateAnonymousName();
    await addDoc(collection(db, "pauses"), {
      uid: user.uid,
      name: anonymousName,
      startTime: serverTimestamp()
    });
  };

  const getLightColor = () => {
    if (pauses.length >= MAX_PAUSES) return "red";
    if (pauses.length >= MAX_PAUSES - 1) return "orange";
    return "green";
  };

  return (
    <div className="text-center mt-5">
      <div className="card card-feu shadow-sm mx-auto">
        <div className="card-body">
          <h1 className="mb-4">Feu Pause Téléconseillers</h1>
          <div className="d-flex justify-content-center mb-4">
            <PauseLight color={getLightColor()} />
          </div>
          <button
            onClick={handlePause}
            disabled={!user || !!userPause || pauses.length >= MAX_PAUSES}
            className="btn btn-primary btn-lg w-100 mb-3 btn-pause"
          >
            Je pars en pause
          </button>
          {userPause && <UserPause name={userPause.name} remaining={remaining} />}
          <div className="mt-4">
            <h5 className="mb-3">Pauses en cours <span className="badge bg-secondary">{pauses.length}</span></h5>
            <PauseList pauses={pauses} />
          </div>
        </div>
      </div>
    </div>
  );
}
