import Image from "next/image"
import Link from "next/link"

import CartButton from "../buttons/CartButton"
import FavoritesButton from "../buttons/FavoritesButton"
import PriceTag from "../common/PriceTag"

type ItemProps = {
  locale: Locale
  vendorCode: string
  name: string
  imageURL: string
  price: number
  discount: number
  finalPrice: number
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
  user_email,
  currentCurrency,
  rates,
}: ItemProps) {
  return (
    <li className="grid gap-1 w-[17rem]">
      <Link href={`/${locale}/furniture/${vendorCode}`} title={name}>
        <Image
          className="rounded-lg drop-shadow-md"
          src={imageURL}
          alt={name}
          width={272}
          height={272}
        />
      </Link>
      <div className="p-2 grid self-end gap-2">
        <PriceTag
          price={price}
          discount={discount}
          finalPrice={finalPrice}
          currentCurrency={currentCurrency}
          exchangeRates={rates}
          user_email={user_email}
        />
        <Link className="truncate" href={`/${locale}/furniture/${vendorCode}`}>
          <h2 className="fluid-base text-textSecondary truncate" title={name}>
            {name}
          </h2>
        </Link>
        <div className="grid grid-cols-[1fr,3rem] gap-1">
          <CartButton currentVendorCode={vendorCode} user_email={user_email} />
          <FavoritesButton
            currentVendorCode={vendorCode}
            user_email={user_email}
          />
        </div>
      </div>
    </li>
  )
}
