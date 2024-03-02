import Image from "next/image"
import Link from "next/link"

type ItemProps = {
  locale: Locale
  vendorCode: string
  name: string
  imageURL: string
  price: number
  discount: number
  finalPrice: number
}

export default function ItemComponent({
  locale,
  vendorCode,
  name,
  imageURL,
  price,
  discount,
  finalPrice,
}: ItemProps) {
  return (
    <li>
      <Link href={`/${locale}/furniture/${vendorCode}`}>
        <Image src={imageURL} alt={name} width={200} height={200} />
        <span>Price: {finalPrice}$ </span>
        {discount > 0 ? (
          <>
            <span className="line-through">{price}$ </span>
            <span>{discount}%</span>
          </>
        ) : null}

        <h2>{name}</h2>
      </Link>
    </li>
  )
}
