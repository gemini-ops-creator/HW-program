import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "./firebaseConfig";

const USERS_COLLECTION = "users";

type UserProfile = DocumentData & {
  email?: string | null;
  displayName?: string | null;
  createdAt?: unknown;
};

export async function getUser(uid: string): Promise<UserProfile | null> {
  const snapshot = await getDoc(doc(db, USERS_COLLECTION, uid));
  return snapshot.exists() ? (snapshot.data() as UserProfile) : null;
}

export async function saveUser(user: User): Promise<void> {
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
