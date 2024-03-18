import "./globals.css"

import type { Metadata } from "next"

import { Header } from "./components/Header"

export const metadata: Metadata = {
  title: "New Furniture",
  description: "Shopping app",
}
const locales = ["en", "ro", "ru"]

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: {
    locale: Locale
  }
}) {
  return (
    <html lang={locale}>
      <body className="dark">
        <div
          className={`font-sans grid grid-cols-[minmax(0.5rem,1fr),minmax(20rem,90rem),minmax(0.5rem,1fr)] bg-bgPrimary overflow-x-hidden min-h-screen`}
        >
          <div className="col-start-2 col-end-3">
            <Header locale={locale} />
            {children}
            <footer>
              <span>Footer</span>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}
