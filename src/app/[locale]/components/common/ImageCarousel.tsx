"use client"

import { useState } from "react"

import Image from "next/image"

type ImageCarouselProps = {
  URLs: string[]
}

export default function ImageCarousel({ URLs }: ImageCarouselProps) {
  const [image, setImage] = useState(0)
  return (
    <section className="grid gap-2 w-full items-center">
      <div className="flex overflow-hidden items-center scroll-smooth">
        {URLs.map((URL, idx) => (
          <div
            style={{ transform: `translateX(-${image * 100}%)` }}
            className="flex-shrink-0 w-full rounded drop-shadow-md p-2 transition-transform ease-in-out duration-300"
            key={idx + "images"}
          >
            <Image
              className="w-full rounded-lg"
              src={URL}
              alt="thumbnail"
              width={380}
              height={380}
            />
          </div>
        ))}
      </div>
      <div className="flex overflow-auto gap-1 p-2 drop-shadow-sm">
        {URLs.map((URL, idx) => (
          <button
            className={`p-1 flex items-center bg-gray-50 border-2 rounded-lg transition-colors ${
              idx === image ? "border-brand1" : ""
            }`}
            key={idx + "links"}
            onClick={() => setImage(idx)}
          >
            <Image
              className="rounded-lg"
              src={URL}
              alt="thumbnail"
              width={80}
              height={80}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
