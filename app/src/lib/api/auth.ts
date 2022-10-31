import { goto } from "$app/navigation";
import { readable } from "svelte/store";
import type { User } from "firebase/auth";
import { deleteUser as authDelete } from "firebase/auth";

import { auth } from "./firebase";

export const currentUser = readable<User | null>(null, (set) => {
  auth.onAuthStateChanged(set);
});

export const signOut = () => {
  auth.signOut();
  goto('/');
};
export { User as User };

export const deleteUser = (user: User) => {
  authDelete(user);
  auth.signOut();
  goto('/');
  // すでに実験同意済みである程度アノテーションしてくれた参加者が
  // 実験終わったと思ってアカウント削除する可能性があるので
  // アカウント削除にともなうデータ削除はなし
  // どのみち実験終了後になにもかもデータは消すので問題ない
};
