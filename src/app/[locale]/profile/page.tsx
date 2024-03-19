import { and, count, desc, eq } from "drizzle-orm"

import getCurrencyConversion from "@/app/api/currencyConversion/currencyConversion"
import { db } from "@/app/db"
import {
  items,
  itemsImageURL,
  itemsName,
  orders,
  user_profile,
} from "@/app/db/schema"
import { auth } from "@/app/lib/auth"

import DeleteProfileButton from "../components/common/DeleteProfileButton"
import ReceiptItem from "../components/items/ReceiptItem"
import ProfilePreferences from "../components/pageClientSide/ProfilePreferences"
import Pagination from "../components/common/Pagination"
import sanitizeStringToNumber from "@/utils/functions/sanitizeStringToNumber"
import { getTranslations } from "next-intl/server"

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
  const maxItemsOnPage = 15
  const session = await auth()
  const rates: Rates = await getCurrencyConversion()
  const searchParamsSanitized = searchParams
    ? {
        page: sanitizeStringToNumber(searchParams?.page) || 1,
      }
    : null

  const tlAsync = await getTranslations("Profile")

  const profilePreferencesTl = {
    Language: tlAsync("Language"),
    Theme: tlAsync("Theme"),
    Currency: tlAsync("Currency"),
    USD: tlAsync("USD"),
    EUR: tlAsync("EUR"),
    MDL: tlAsync("MDL"),
    en: tlAsync("En"),
    ro: tlAsync("Ro"),
    ru: tlAsync("Ru"),
    light: tlAsync("Light"),
    dark: tlAsync("Dark"),
  }

  const deleteButtonTl = {
    Delete: tlAsync("Delete"),
    Cancel: tlAsync("Cancel"),
    DeleteProfile: tlAsync("DeleteProfile"),
    DeleteDisclaimer: tlAsync("DeleteDisclaimer"),
  }

  const receiptItemTl = {
    PerItem: tlAsync("PerItem"),
    TotalItems: tlAsync("TotalItems"),
    OrderDate: tlAsync("OrderDate"),
  }

  let currentCurrency: Currency | null
  if (session) {
    const preferredCurrencyArr = await db
      .select()
      .from(user_profile)
      .where(eq(user_profile.user_email, session.user?.email || ""))
      .execute()
    currentCurrency = (preferredCurrencyArr[0]?.currency || "USD") as Currency
  } else {
    currentCurrency = null
  }
  const orderItems = session
    ? await db
        .select({
          vendor_code: items.vendor_code,
          name:
            params.locale === "en"
              ? itemsName.en
              : params.locale === "ro"
              ? itemsName.ro
              : params.locale === "ru"
              ? itemsName.ru
              : itemsName.en,
          amount: orders.amount,
          price: items.price,
          discount: items.discount,
          final_price: items.final_price,
          thumbnailURL: itemsImageURL.url,
          purchase_time: orders.purchase_time,
        })
        .from(orders)
        .where(
          and(
            eq(orders.user_email, session?.user?.email || ""),
            eq(itemsImageURL.image_number, 1)
          )
        )
        .innerJoin(items, eq(items.vendor_code, orders.item_vendor_code))
        .innerJoin(
          itemsImageURL,
          eq(itemsImageURL.vendor_code, items.vendor_code)
        )
        .innerJoin(itemsName, eq(itemsName.vendor_code, items.vendor_code))
        .limit(15)
        .offset(
          searchParamsSanitized?.page
            ? (searchParamsSanitized.page - 1) * maxItemsOnPage
            : 0
        )
        .orderBy(desc(orders.purchase_time))
        .execute()
    : null

  const itemsCountArr = await db
    .select({ totalItems: count(orders.id) })
    .from(orders)
    .where(eq(orders.user_email, session?.user?.email || ""))
    .execute()

  const totalItems = itemsCountArr[0].totalItems || 0
  return (
    <main className="text-textPrimary">
      <h1 className="fluid-2xl font-bold p-4">{tlAsync("Profile")}</h1>
      <ul className="grid gap-2 fluid-lg p-4">
        {session ? (
          <>
            <li className="flex gap-1">
              <span className="text-textSecondary">{tlAsync("Name")}:</span>
              <span className="font-semibold">{session.user?.name}</span>
            </li>
            <li className="flex gap-1">
              <span>{tlAsync("Email")}:</span>{" "}
              <span className="font-semibold">{session.user?.email}</span>
            </li>
          </>
        ) : (
          <li className="flex gap-1">
            <span className="text-textSecondary">{tlAsync("Name")}:</span>
            <span className="font-semibold">{tlAsync("DefaultName")}</span>
          </li>
        )}
        <ProfilePreferences tl={profilePreferencesTl} />
        {session ? (
          <li>
            <DeleteProfileButton
              tl={deleteButtonTl}
              userEmail={session?.user?.email}
            />
          </li>
        ) : null}
      </ul>

      {session ? (
        <section>
          <h1 className="fluid-xl font-bold py-2 px-4">{tlAsync("History")}</h1>
          {orderItems?.length ? (
            <ul className="grid gap-2 border border-borderThin rounded-lg p-1 overflow-auto">
              {orderItems.map((item) => (
                <ReceiptItem
                  tl={receiptItemTl}
                  key={item.vendor_code}
                  vendorCode={item.vendor_code!}
                  name={item.name}
                  imageURL={item.thumbnailURL!}
                  price={item.price}
                  discount={item.discount}
                  finalPrice={item.final_price!}
                  user_email={session?.user?.email}
                  currentCurrency={currentCurrency || "USD"}
                  locale={params.locale}
                  amount={item.amount}
                  rates={rates}
                  orderDate={item.purchase_time}
                />
              ))}
            </ul>
          ) : (
            <section className="text-textSecondary fluid-lg px-6 py-4">
              {tlAsync("NoOrders")}
            </section>
          )}
          <Pagination totalPages={Math.ceil(totalItems / maxItemsOnPage)} />
        </section>
      ) : (
        <section className="text-textCrossed fluid-lg italic px-6 py-4">
          {tlAsync("LogInDisclaimer")}.
        </section>
      )}
    </main>
  )
}
