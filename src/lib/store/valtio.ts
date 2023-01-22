import { proxy } from "valtio";

import { getUser, User } from "../firebase/firestore";

type State = {
  currentUser: User | null;
  isRequestedMessagingPermission: boolean;
};

export const state = proxy<State>({
  currentUser: null,
  isRequestedMessagingPermission: false,
});

export const initUser = () => {
  state.currentUser = null;
};
export const setCurrentUser = async (uid: string) => {
  const user = await getUser(uid);
  state.currentUser = user;
};

export const updateRequestedMessagingPermissionState = () => {
  state.isRequestedMessagingPermission = true;
};
