import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { Form } from "@/pages/form";
import { SignUpForm } from "@/pages-component/auth/SignUp";

import { db } from "./firebase";

export type Post = {
  id: string;
  title: string;
  body: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export const getPosts = async (): Promise<Post[]> => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const postsDocs = querySnapshot.docs;

  const postsData = postsDocs.map((postsDoc) => {
    return {
      ...postsDoc.data(),
      id: postsDoc.id,
    };
  });
  return postsData as Post[];
};

export const createPost = async (data: Form) => {
  await addDoc(collection(db, "posts"), data);
};

export const createUser = async (
  uid: string,
  data: SignUpForm
): Promise<void> => {
  await setDoc(doc(db, "users", uid), {
    email: data.email,
    name: data.name,
  });
};

export const getUser = async (userId: string): Promise<User> => {
  const docSnap = await getDoc(doc(db, "users", userId));
  const userData = { ...docSnap.data(), id: docSnap.id } as User;
  return userData;
};

export const updateFcmToken = async (
  uid: string,
  fcmToken: string
): Promise<void> => {
  const fcmTokenRef = doc(db, "fcmTokens", uid);
  await setDoc(fcmTokenRef, { fcmToken });
};

export const deletePost = async (id: string) => {
  await deleteDoc(doc(db, "posts", id));
};
