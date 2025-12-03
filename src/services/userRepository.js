import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.js";

const USERS_COLLECTION = "users";

export async function getUser(uid) {
  const snapshot = await getDoc(doc(db, USERS_COLLECTION, uid));
  return snapshot.exists() ? snapshot.data() : null;
}

export async function saveUser(user) {
  const { uid, email, displayName } = user;
  if (!uid) {
    throw new Error("User uid is required to save user");
  }

  const ref = doc(db, USERS_COLLECTION, uid);
  const existing = await getDoc(ref);

  if (existing.exists()) {
    return;
  }

  await setDoc(ref, {
    email: email ?? "",
    displayName: displayName ?? "",
    createdAt: serverTimestamp(),
  });
}
