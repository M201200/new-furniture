import Link from "next/link"

import { auth } from "@/app/lib/auth"

export default async function SignIn() {
  const session = await auth()
  return !session ? (
    <Link
      className="flex bg-red-600 text-white fluid-base text-center p-2 rounded"
      href={"/api/auth/signin"}
    >
      Sign in
    </Link>
  ) : (
    <Link
      className="flex bg-red-600 text-white fluid-base text-center p-2 rounded"
      href={"/api/auth/signout"}
    >
      Sign out
    </Link>
  )
}
