import Link from "next/link"

import { auth } from "@/app/lib/auth"

export default async function SignIn() {
  const session = await auth()
  return !session ? (
    <Link href={"/api/auth/signin"}>Sign in</Link>
  ) : (
    <Link href={"/api/auth/signout"}>Sign out</Link>
  )
}
