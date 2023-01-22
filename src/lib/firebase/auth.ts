import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  UserCredential,
} from "firebase/auth";

import { SignUpForm } from "@/pages-component/auth/SignUp";

import { initUser } from "../store/valtio";
import { auth } from "./firebase";
import { createUser } from "./firestore";

type Auth = {
  email: string;
  password: string;
};

export const signUp = async (data: SignUpForm): Promise<UserCredential> => {
  const currentUser = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  await createUser(currentUser.user.uid, data);

  return currentUser;
};

export const signIn = async (data: Auth): Promise<UserCredential> => {
  const user = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  return user;
};

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
  initUser();
};
