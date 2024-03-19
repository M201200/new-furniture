import { getTranslations } from "next-intl/server"

type LoadingProps = {
  params: {
    locale: Locale
  }
}

export default async function Loading({ params }: LoadingProps) {
  const tl = await getTranslations("States")
  return (
    <main className="bg-bgPrimary grid place-content-center min-h-[50vh]">
      <h1 className="fluid-4xl text-textPrimary font-bold">{tl("Loading")}</h1>
    </main>
  )
}
