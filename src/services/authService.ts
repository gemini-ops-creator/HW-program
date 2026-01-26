import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function subscribeToAuthChanges(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
