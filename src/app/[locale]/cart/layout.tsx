import { auth } from "@/app/lib/auth"

type ProfileProps = {
  guest: React.ReactNode
  user: React.ReactNode
}

export default async function Layout({ guest, user }: ProfileProps) {
  const session = await auth()
  return <>{!session ? guest : user}</>
}
