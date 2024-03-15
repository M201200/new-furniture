import Image from "next/image"
import Link from "next/link"

type ImageCarouselProps = {
  URLs: string[]
}

export default function ImageCarousel({ URLs }: ImageCarouselProps) {
  return (
    <section className="grid gap-2 w-full items-center">
      <div className="flex gap-2 overflow-hidden items-center scroll-smooth">
        {URLs.map((URL, idx) => (
          <div
            className="flex-shrink-0 w-full rounded drop-shadow-md"
            key={idx + "images"}
          >
            <Image
              className=" w-full"
              id={`${idx}`}
              src={URL}
              alt="thumbnail"
              width={380}
              height={380}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1 rounded drop-shadow-sm ">
        {URLs.map((URL, idx) => (
          <Link href={`#${idx}`} key={idx + "links"}>
            <Image src={URL} alt="thumbnail" width={272} height={272} />
          </Link>
        ))}
      </div>
    </section>
  )
}
