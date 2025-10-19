import React, { useEffect, useState } from "react";
import { db, ensureAnonymousSignIn } from "./firebase";
import { collection, addDoc, query, onSnapshot, serverTimestamp, orderBy } from "firebase/firestore";

const PAUSE_DURATION_MIN = 15;
const MAX_PAUSES = 4;

export default function App() {
  const [user, setUser] = useState(null);
  const [pauses, setPauses] = useState([]);

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
    });
    return unsubscribe;
  }, []);

  const handlePause = async () => {
    if (!user || pauses.length >= MAX_PAUSES) return;
    await addDoc(collection(db, "pauses"), {
      uid: user.uid,
      startTime: serverTimestamp()
    });
  };

  const getLightColor = () => {
    if (pauses.length >= MAX_PAUSES) return "red";
    if (pauses.length >= MAX_PAUSES - 1) return "orange";
    return "green";
  };

  return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h1>Feu Pause Téléconseillers</h1>
        <div style={{
          width: 100,
          height: 100,
          margin: "20px auto",
          borderRadius: "50%",
          backgroundColor: getLightColor()
        }} />
        <button
            onClick={handlePause}
            disabled={pauses.length >= MAX_PAUSES}
            style={{ padding: "10px 20px", fontSize: 16 }}
        >
          Je pars en pause
        </button>
        <div style={{ marginTop: 20 }}>
          <h3>Pauses en cours ({pauses.length})</h3>
          <ul>
            {pauses.map(p => (
                <li key={p.id}>
                  {p.uid} - {new Date(p.startTime?.toMillis()).toLocaleTimeString()}
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
}
