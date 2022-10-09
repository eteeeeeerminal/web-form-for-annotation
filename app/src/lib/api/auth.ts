import { goto } from "$app/navigation";
import { readable } from "svelte/store";
import type { User } from "firebase/auth";

import { auth } from "./firebase";

export const currentUser = readable<User | null>(null, (set) => {
  auth.onAuthStateChanged(set);
});

export const signOut = () => {
  auth.signOut();
  goto('/');
};
export { User as User };
