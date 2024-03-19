"use client"

import { startTransition, useCallback, useEffect, useState } from "react"

import massRemove from "@/utils/actions/CartActions/massRemove"
import orderItems, { Order } from "@/utils/actions/CartActions/orderItems"
import getAllItems from "@/utils/actions/getAllItems"
import {
  removeCartItems,
  removeItem,
} from "@/utils/functions/LocalStorageActions"
import { useCart } from "@/utils/hooks/zustand/useCart"
import { usePreferences } from "@/utils/hooks/zustand/usePreferences"

import CartItem from "../items/CartItem"
import ReceiptItem from "../items/ReceiptItem"

type CartProps = {
  tl: {
    Cart: string
    Select: string
    DeleteSelected: string
    Accept: string
    Delete: string
    Cancel: string
    Order: string
    Congratulation: string
    Proceed: string
    Total: string
    Orders: string
    Selected: string
    Discount: string
    FinalPrice: string
    DeleteDisclaimer: string
    LogInDisclaimer: string
    EnterNumber: string
    NothingFound: string
    Loading: string
    Error: string
    PerItem: string
    TotalItems: string
    OrderDate: string
  }

  locale: Locale
  rates: Rates
  userEmail: string | null | undefined
}

export default function Cart({ tl, locale, rates, userEmail }: CartProps) {
  const cart = useCart((state) => state.entries)
  const removeFromCart = useCart((state) => state.remove)
  const massRemoveFromCart = useCart((state) => state.massRemove)
  const [items, setItems] = useState<
    | {
        vendor_code: string | null
        name: string
        amount: number
        price: number
        discount: number
        final_price: number | null
        thumbnailURL: string | null
      }[]
    | null
    | undefined
  >(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [initialPrice, setInitialPrice] = useState(0)
  const [vendorCodes, setVendorCodes] = useState<string[] | null | undefined>(
    null
  )
  const [selectedArr, setSelectedArr] = useState<string[]>([])
  const [deletedItem, setDeletedItem] = useState<string | null>(null)
  const [openDelete, setOpenDelete] = useState(false)
  const [openOrders, setOpenOrders] = useState(false)
  const [openAffirmation, setOpenAffirmation] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState("")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const language = usePreferences((state) => state.locale)
  const currency = usePreferences((state) => state.currency)

  const currentRate =
    currency === "EUR" ? rates.EUR : currency === "MDL" ? rates.MDL : 1

  const loadItems = useCallback(() => {
    getAllItems(vendorCodes, language)
      .then((data) => {
        setItems(data)
        setTotalPrice(
          data && cart
            ? data
                ?.map((item) =>
                  selectedArr.includes(item.vendor_code!)
                    ? +item.final_price! *
                      cart?.find(
                        (cartItem) => cartItem.vendor_code === item.vendor_code
                      )?.amount!
                    : 0
                )
                .reduce((a, b) => a + b)
            : 0
        )
        setInitialPrice(
          data && cart
            ? data
                ?.map((item) =>
                  selectedArr.includes(item.vendor_code!)
                    ? +item.price *
                      cart?.find(
                        (cartItem) => cartItem.vendor_code === item.vendor_code
                      )?.amount!
                    : 0
                )
                .reduce((a, b) => a + b)
            : 0
        )
        setLoading(false)
      })
      .catch((err) => {
        setError(true)
      })
  }, [language, cart, vendorCodes, selectedArr])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  useEffect(() => {
    setVendorCodes(cart?.map((item) => item.vendor_code))
  }, [cart])

  useEffect(() => {
    setSelectedArr(vendorCodes || [])
  }, [vendorCodes])

  return (
    <section className="min-h-[40vh]">
      <h1 className="fluid-3xl font-bold p-4 text-textPrimary">{tl.Cart}</h1>
      <div
        aria-disabled={openOrders || openDelete || openAffirmation}
        className="grid lg:grid-cols-[1fr,0.5fr] items-start gap-4 "
      >
        <ul className="grid content-center gap-4">
          {loading ? (
            <li className="fluid-xl font-bold p-2 text-textPrimary">
              {tl.Loading}
            </li>
          ) : error ? (
            <li className="fluid-xl font-bold p-2 text-textPrimary">
              {tl.Error}
            </li>
          ) : items?.length ? (
            <>
              <li className="flex gap-4 items-center text-center  fluid-base px-4 py-2 border border-borderThin text-textPrimary rounded-lg">
                <span className="flex gap-2 items-center text-center">
                  <input
                    className="w-4 h-4 cursor-pointer text-textSecondary"
                    id="select all"
                    type="checkbox"
                    checked={selectedArr.length === items?.length}
                    onChange={() => {
                      setSelectedArr(
                        selectedArr.length === items?.length
                          ? []
                          : items?.map((item) => item.vendor_code!)
                      )
                    }}
                  />
                  <label htmlFor="select all">
                    {tl.Select} ({items?.length})
                  </label>
                </span>
                {selectedArr.length ? (
                  <button
                    className="items-center text-center text-red-600 font-bold p-1"
                    onClick={() => setOpenDelete(true)}
                  >
                    {tl.DeleteSelected}
                  </button>
                ) : null}
              </li>
              {items.map((item) => (
                <li
                  className="flex flex-grow items-center gap-4 px-4 py-2 border border-borderThin rounded-lg"
                  key={item.vendor_code}
                >
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    checked={selectedArr.includes(item.vendor_code!)}
                    onChange={() => {
                      setSelectedArr(
                        selectedArr.includes(item.vendor_code!)
                          ? selectedArr.filter(
                              (code) => code !== item.vendor_code
                            )
                          : [...selectedArr, item.vendor_code!]
                      )
                    }}
                  />
                  <CartItem
                    tl={tl.PerItem}
                    vendorCode={item.vendor_code!}
                    name={item.name}
                    imageURL={item.thumbnailURL!}
                    price={item.price}
                    discount={item.discount}
                    finalPrice={item.final_price!}
                    user_email={userEmail}
                    currentCurrency={currency}
                    locale={locale}
                    rates={rates}
                    setDialogState={setOpenDelete}
                    setDeleteItem={setDeletedItem}
                  />
                </li>
              ))}
            </>
          ) : (
            <li className="fluid-xl font-bold p-2 text-textPrimary">
              {tl.NothingFound}
            </li>
          )}
        </ul>
        {items?.length ? (
          <ul className="border border-borderThin rounded-lg grid p-4 gap-2 text-textPrimary">
            <li className="grid">
              <button
                className={`fluid-xl text-center  rounded-lg p-4 text-gray-300 ${
                  selectedArr?.length
                    ? "opacity-100 bg-brand1"
                    : "opacity-50 cursor-not-allowed bg-gray-500"
                }`}
                disabled={!selectedArr.length}
                onClick={() => setOpenOrders(true)}
              >
                {tl.Order}
              </button>
            </li>
            <li className="grid grid-cols-2 gap-2">
              <h2 className="fluid-lg text-textSecondary">{tl.Selected}:</h2>
              <span className="fluid-lg font-bold justify-self-end">
                {new Intl.NumberFormat(locale, {
                  style: "currency",
                  currency: currency,
                }).format(+initialPrice * currentRate)}{" "}
                ({selectedArr?.length})
              </span>
            </li>
            <li className="grid grid-cols-2 gap-2">
              <h2 className="fluid-lg text-textSecondary">{tl.Discount}:</h2>
              <span className="fluid-lg font-bold text-red-600 justify-self-end">
                {new Intl.NumberFormat(locale, {
                  style: "currency",
                  currency: currency,
                }).format((+totalPrice - +initialPrice) * currentRate)}
              </span>
            </li>
            <li className="grid grid-cols-2 gap-2">
              <h2 className="fluid-lg text-textSecondary">{tl.FinalPrice}:</h2>
              <span className="fluid-lg font-bold justify-self-end">
                {new Intl.NumberFormat(locale, {
                  style: "currency",
                  currency: currency,
                }).format(+totalPrice * currentRate)}
              </span>
            </li>
          </ul>
        ) : null}
      </div>
      {openDelete ? (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-bgPrimary m-auto p-8 rounded-lg drop-shadow-md max-w-[95%] text-textPrimary">
            <div className="flex flex-col gap-4 items-center">
              <h3 className="fluid-lg">{tl.DeleteDisclaimer}</h3>
              <div className="flex gap-4 items-stretch">
                <button
                  className="bg-red-600 text-gray-100 rounded-lg p-2"
                  onClick={() => {
                    if (deletedItem) {
                      setSelectedArr(
                        selectedArr.filter(
                          (vendorCode) => vendorCode !== deletedItem
                        )
                      )
                      removeFromCart(deletedItem || "")
                      if (userEmail) {
                        startTransition(() => {
                          massRemove(userEmail, [deletedItem])
                        })
                      } else {
                        removeItem("cart", deletedItem)
                      }
                      setDeletedItem(null)
                    } else {
                      massRemoveFromCart(selectedArr)
                      if (userEmail) {
                        startTransition(() => {
                          massRemove(userEmail, selectedArr)
                        })
                      } else {
                        removeCartItems(selectedArr)
                      }
                      setSelectedArr([])
                    }
                    setOpenDelete(false)
                  }}
                >
                  {tl.Delete}
                </button>
                <button
                  className="bg-gray-600 rounded-lg text-gray-100 p-2"
                  onClick={() => setOpenDelete(false)}
                >
                  {tl.Cancel}
                </button>
              </div>
            </div>
          </div>
        </dialog>
      ) : null}
      {openOrders ? (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-bgPrimary m-auto p-8 rounded-lg text-textPrimary drop-shadow-md max-w-[95%]">
            <div className="grid gap-4">
              <h2 className="fluid-xl font-bold">{tl.Orders}:</h2>
              {!userEmail ? (
                <p className="fluid-base text-textCrossed">
                  {tl.LogInDisclaimer}
                </p>
              ) : null}
              <ul className="grid gap-2 max-h-[60vh] lg:max-h-[40vh] border border-borderThin rounded-lg p-1 overflow-auto">
                {items
                  ?.filter((item) => selectedArr.includes(item.vendor_code!))!
                  .map((item) => (
                    <ReceiptItem
                      tl={{
                        PerItem: tl.PerItem,
                        TotalItems: tl.TotalItems,
                        OrderDate: tl.OrderDate,
                      }}
                      key={item.vendor_code}
                      vendorCode={item.vendor_code!}
                      name={item.name}
                      imageURL={item.thumbnailURL!}
                      price={item.price}
                      discount={item.discount}
                      finalPrice={item.final_price!}
                      user_email={userEmail}
                      currentCurrency={currency}
                      locale={locale}
                      amount={
                        cart?.find(
                          (cartItem) =>
                            item.vendor_code === cartItem.vendor_code
                        )?.amount!
                      }
                      rates={rates}
                    />
                  ))}
              </ul>

              <div className="grid gap-2 justify-center">
                <label className="fluid-lg text-textSecondary" htmlFor="phone">
                  {tl.EnterNumber}
                </label>
                <div className="flex justify-center fluid-base">
                  <div
                    className={`flex gap-1 p-1 border-2  rounded-lg ${
                      phoneNumber.length < 8 && phoneNumber.length > 0
                        ? "border-red-600"
                        : phoneNumber.length === 8
                        ? "border-green-600"
                        : "border-gray-400"
                    }`}
                  >
                    <span>+373</span>
                    <input
                      className="max-w-24 px-1 bg-bgPrimary"
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(e.target.value.replace(/\D/g, ""))
                      }
                      type="text"
                      id="phone"
                      maxLength={8}
                    />
                  </div>
                </div>
              </div>
              <ul className="rounded-lg grid p-4 gap-2">
                <li className="grid grid-cols-2 gap-2 border-b border-borderThin">
                  <h2 className="fluid-lg text-textSecondary">{tl.Total}:</h2>
                  <span className="fluid-lg font-bold justify-self-end">
                    {new Intl.NumberFormat(locale, {
                      style: "currency",
                      currency: currency,
                    }).format(+initialPrice * currentRate)}{" "}
                    ({selectedArr?.length})
                  </span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-b border-borderThin">
                  <h2 className="fluid-lg text-textSecondary">
                    {tl.Discount}:
                  </h2>
                  <span className="fluid-lg font-bold text-red-600 justify-self-end">
                    {new Intl.NumberFormat(locale, {
                      style: "currency",
                      currency: currency,
                    }).format((+totalPrice - +initialPrice) * currentRate)}
                  </span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-b border-borderThin">
                  <h2 className="fluid-lg text-textSecondary">
                    {tl.FinalPrice}:
                  </h2>
                  <span className="fluid-lg font-bold justify-self-end">
                    {new Intl.NumberFormat(locale, {
                      style: "currency",
                      currency: currency,
                    }).format(+totalPrice * currentRate)}
                  </span>
                </li>
              </ul>
              <div className="flex gap-4 justify-center">
                <button
                  className={`text-gray-100 rounded-lg p-2 ${
                    phoneNumber.length === 8
                      ? "bg-green-600"
                      : "opacity-50 bg-green-500 cursor-not-allowed"
                  }`}
                  disabled={phoneNumber.length !== 8}
                  onClick={() => {
                    if (userEmail) {
                      startTransition(() => {
                        const orders = cart?.map((item) => ({
                          item_vendor_code: item.vendor_code,
                          user_email: userEmail,
                          amount: item.amount,
                        }))
                        orderItems(orders as Order[])
                        massRemove(userEmail, selectedArr)
                      })
                    } else {
                      removeCartItems(selectedArr)
                    }
                    setOpenOrders(false)
                    massRemoveFromCart(selectedArr)
                    setSelectedArr([])
                    setOpenAffirmation(true)
                  }}
                >
                  {tl.Accept}
                </button>
                <button
                  className="bg-gray-500 rounded-lg text-gray-100 p-2"
                  onClick={() => setOpenOrders(false)}
                >
                  {tl.Cancel}
                </button>
              </div>
            </div>
          </div>
        </dialog>
      ) : null}
      {openAffirmation ? (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-bgPrimary text-textPrimary m-auto p-8 rounded-lg drop-shadow-md max-w-[95%]">
            <div className="flex flex-col gap-4 items-center">
              <h3 className="fluid-xl text-center">{tl.Congratulation}</h3>
              <button
                className="bg-brand1 rounded-lg text-gray-200 p-2"
                onClick={() => setOpenAffirmation(false)}
              >
                {tl.Proceed}
              </button>
            </div>
          </div>
        </dialog>
      ) : null}
    </section>
  )
}
