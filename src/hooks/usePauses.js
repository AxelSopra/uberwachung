import { useEffect, useCallback, useState } from "react";
import { db } from "../datasource/firebase";
import { collection, addDoc, query, onSnapshot, serverTimestamp, orderBy, deleteDoc, doc } from "firebase/firestore";
import { PAUSE_DURATION_MIN, MAX_PAUSES, MAX_PAUSES_PER_HALF_DAY, HALF_DAY_PERIODS } from "../utils/constants";

function getCurrentHalfDay(date = new Date()) {
  const hour = date.getHours();
  for (let i = 0; i < HALF_DAY_PERIODS.length; i++) {
    if (hour >= HALF_DAY_PERIODS[i].start && hour < HALF_DAY_PERIODS[i].end) {
      return i;
    }
  }
  return null;
}
function isSameHalfDay(ts1, ts2) {
  const d1 = new Date(ts1);
  const d2 = new Date(ts2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate() &&
    getCurrentHalfDay(d1) === getCurrentHalfDay(d2)
  );
}
export default function usePauses({ userId, userName, userAvatar }) {
  const [pauses, setPauses] = useState([]);
  const [userPause, setUserPause] = useState(null);
  const [userPausesThisHalfDay, setUserPausesThisHalfDay] = useState([]);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "pauses"), orderBy("startTime", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const now = Date.now();
      const active = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(p => p.startTime && (now < p.startTime.toMillis() + PAUSE_DURATION_MIN * 60 * 1000));
      setPauses(active);
      const myPause = active.find(p => p.uid === userId);
      setUserPause(myPause || null);
      const userPauses = active.filter(p => p.uid === userId && p.startTime && isSameHalfDay(p.startTime.toMillis(), now));
      setUserPausesThisHalfDay(userPauses);
      if (myPause && myPause.startTime) {
        const end = myPause.startTime.toMillis() + PAUSE_DURATION_MIN * 60 * 1000;
        setRemaining(Math.max(0, Math.ceil((end - now) / 60000)));
      } else {
        setRemaining(0);
      }
    });
    return unsubscribe;
  }, [userId]);

  useEffect(() => {
    if (!userPause) return;
    const end = userPause.startTime.toMillis() + PAUSE_DURATION_MIN * 60 * 1000;
    const timeout = setTimeout(async () => {
      await deleteDoc(doc(db, "pauses", userPause.id));
    }, end - Date.now());
    return () => clearTimeout(timeout);
  }, [userPause]);

  const handlePause = useCallback(async () => {
    if (!!userPause) return;
    if (userPausesThisHalfDay.length >= MAX_PAUSES_PER_HALF_DAY) return;
    await addDoc(collection(db, "pauses"), {
      uid: userId,
      name: userName,
      avatar: userAvatar,
      startTime: serverTimestamp()
    });
  }, [userPause, userPausesThisHalfDay, userId, userName, userAvatar]);

  const canTakePause = !userPause && pauses.length < MAX_PAUSES && userPausesThisHalfDay.length < MAX_PAUSES_PER_HALF_DAY;

  return {
    pauses,
    userPause,
    userPausesThisHalfDay,
    remaining,
    canTakePause,
    handlePause
  };
}
