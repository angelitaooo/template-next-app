"use server";

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData: FormData) {
  const action = formData.get("action") as string | undefined;

  console.log("action", action);
  await signIn(action);
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}
