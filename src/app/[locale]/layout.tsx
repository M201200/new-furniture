import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

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
    locale: string
  }
}) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <header>
          <span>Logo</span>
          <ul>
            <li>Search</li>
            <li>Menu</li>
            <li>Lang</li>
            <li>Theme</li>
          </ul>
        </header>
        {children}
        <footer>
          <span>Info</span>
        </footer>
      </body>
    </html>
  )
}
