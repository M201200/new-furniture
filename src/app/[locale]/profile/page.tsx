import { auth } from "@/app/lib/auth"

import ProfilePreferences from "../components/ProfilePreferences"

type ProfilePageParams = {
  params: {
    locale: Locale
  }
  searchParams?: {
    page?: string
  }
}

export default async function ProfilePage({
  params,
  searchParams,
}: ProfilePageParams) {
  const session = await auth()

  return (
    <main>
      <h1 className="fluid-3xl font-bold p-4">User Profile</h1>
      <ul className="grid gap-2 fluid-lg p-4">
        {session ? (
          <>
            <li className="flex gap-1">
              <span>User name:</span>
              <span className="font-semibold">{session.user?.name}</span>
            </li>
            <li className="flex gap-1">
              <span>User email:</span>{" "}
              <span className="font-semibold">{session.user?.email}</span>
            </li>
          </>
        ) : (
          <li className="flex gap-1">
            <span>User name:</span>
            <span className="font-semibold">Guest</span>
          </li>
        )}
        <ProfilePreferences />
      </ul>
    </main>
  )
}
