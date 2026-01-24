import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig.js";

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}
