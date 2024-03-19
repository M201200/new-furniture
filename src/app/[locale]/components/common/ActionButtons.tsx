"use client"
import { useEffect, useRef, useState } from "react"

import { Session } from "next-auth"
import Link from "next/link"
import { BsList } from "react-icons/bs"
import { IoPersonOutline, IoPersonSharp } from "react-icons/io5"

import CartLink from "../links/CartLink"
import FavoritesLink from "../links/FavoritesLink"
import SignIn from "../links/SignIn"

type userPreferences = {
  theme: Theme | null
  preferredLocale: Locale
  currency: Currency | null
  favVendorCodes: string[] | null
  cartArr:
    | {
        vendor_code: string
        amount: number
      }[]
    | null
}

type ActionButtonsProps = {
  tl: {
    catalog: string
    searchBar: string
    cart: string
    profile: string
    favorites: string
    signin: string
    signout: string
  }
  locale: Locale
  session: Session | null
  userPreferences: userPreferences
}

export function ActionButtons({
  tl,
  locale,
  session,
  userPreferences,
}: ActionButtonsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [ref])

  return (
    <div
      ref={ref}
      className={`relative ${
        isOpen ? "max-w-[30rem]" : "lg:w-full"
      } bg-bgPrimary lg:bg-transparent rounded justify-self-end`}
    >
      <button
        className="text-center p-2 fluid-base rounded flex gap-2 w-full lg:hidden border border-borderThin text-textSecondary items-center transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {<BsList className="fluid-xl" />}
      </button>
      <section
        className={`flex flex-wrap gap-3 gap-x-6 absolute lg:relative w-fit lg:w-full lg:opacity-100 lg:visible transition-[visibility,opacity,transform] ease-in-out lg:translate-x-0 rounded lg:bg-transparent lg:border-none border border-borderThin bg-bgPrimary z-20 p-4 ${
          isOpen
            ? "opacity-100 visible -translate-x-14"
            : "invisible overflow-hidden opacity-0 translate-x-8"
        }`}
      >
        <ul className="flex flex-col-reverse lg:flex-row items-center gap-2 text-textPrimary">
          <CartLink
            tl={tl.cart}
            locale={locale}
            cartArr={userPreferences?.cartArr}
            isOpen={setIsOpen}
          />
          <FavoritesLink
            tl={tl.favorites}
            locale={locale}
            favoritesArr={userPreferences?.favVendorCodes}
            isOpen={setIsOpen}
          />
          <li>
            <Link
              className="grid items-center gap-2 text-center p-1 min-w-12 rounded"
              href={`/${locale}/profile`}
              onClick={() => setIsOpen(false)}
              title={session ? session.user?.name! : tl.profile}
            >
              <span className="fluid-lg justify-self-center">
                {session ? <IoPersonSharp /> : <IoPersonOutline />}
              </span>
              <span className="fluid-sm font-semibold truncate">
                {session ? session.user?.name : tl.profile}
              </span>
            </Link>
          </li>
          <li>
            <SignIn
              tl={{ signin: tl.signin, signout: tl.signout }}
              session={session}
              isOpen={setIsOpen}
            />
          </li>
        </ul>
      </section>
    </div>
  )
}
