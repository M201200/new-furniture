import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Header } from "./components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-commerce",
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
      <body>
        <div
          className={`${inter.className} grid grid-cols-[minmax(0.5rem,1fr),minmax(24rem,90rem),minmax(0.5rem,1fr)]`}
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
