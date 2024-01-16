import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  locales: ["en", "ro", "ru"],

  defaultLocale: "en",
})

export const config = {
  matcher: ["/", "/(ro|en|ru)/:path*"],
}
