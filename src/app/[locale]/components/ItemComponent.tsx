import Image from "next/image"
import Link from "next/link"

import CartButton from "./CartButton"
import FavoritesButton from "./FavoritesButton"
import PriceTag from "./PriceTag"

type ItemProps = {
  locale: Locale
  vendorCode: string
  name: string
  imageURL: string
  price: number
  discount: number
  finalPrice: number
  cartArr: CartItem[] | null
  favoritesArr: string[] | null
  user_email: string | null | undefined
  rates: Rates
  currentCurrency: Currency | null
}

export default function ItemComponent({
  locale,
  vendorCode,
  name,
  imageURL,
  price,
  discount,
  finalPrice,
  cartArr,
  favoritesArr,
  user_email,
  currentCurrency,
  rates,
}: ItemProps) {
  return (
    <li>
      <Link href={`/${locale}/furniture/${vendorCode}`}>
        <Image src={imageURL} alt={name} width={200} height={200} />
        <PriceTag
          price={price}
          discount={discount}
          finalPrice={finalPrice}
          currentCurrency={currentCurrency}
          exchangeRates={rates}
          user_email={user_email}
        />
        <h2>{name}</h2>
      </Link>
      <CartButton
        currentVendorCode={vendorCode}
        user_email={user_email}
        cartArr={cartArr}
      />
      <FavoritesButton
        currentVendorCode={vendorCode}
        user_email={user_email}
        favoritesArr={favoritesArr}
      />
    </li>
  )
}