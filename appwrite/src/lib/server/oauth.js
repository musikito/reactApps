// src/lib/server/oauth.js
"use server";

import { createAdminClient } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

import { signUpWithGithub } from "@/lib/server/oauth";

export default async function SignUpPage() {
  const user = await getLoggedInUser();
  if (user) redirect("/account");

  return (
    <>
      {/* ... existing form */}
      <form action={signUpWithGithub}>
        <button type="submit">Sign up with GitHub</button>
      </form>
    </>
  );
}

export async function signUpWithGithub() {
	const { account } = await createAdminClient();

  const origin = headers().get("origin");
  
	const redirectUrl = await account.createOAuth2Token(
		OAuthProvider.Github,
		`${origin}/oauth`,
		`${origin}/signup`,
	);

	return redirect(redirectUrl);
};
