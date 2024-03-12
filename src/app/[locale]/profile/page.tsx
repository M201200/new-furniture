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
      <h1>User Profile</h1>
      <ul>
        {session ? (
          <>
            <li>User name: {session.user?.name}</li>
            <li>User email: {session.user?.email}</li>
          </>
        ) : (
          <li>User name: Guest</li>
        )}
        <ProfilePreferences />
      </ul>
    </main>
  )
}
