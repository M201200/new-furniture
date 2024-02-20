import { ItemsImageURL } from "../schema"

type imagesInfo = {
  category: number
  serial: number
  variations: {
    images: number
    thumbnail: number
  }[]
}

export const itemsImageURLArr = getItemsImageURLArr()

function getItemsImageURLArr() {
  let itemsImageURLArr: ItemsImageURL[] = []

  function pushURLs({ category, serial, variations }: imagesInfo) {
    for (let i = 0; i < variations.length; i++) {
      for (let j = 0; j < variations[i].images; j++) {
        itemsImageURLArr.push({
          vendor_code: `${category}/${serial}/${i === 0 ? "base" : "v1-" + i}`,
          image_number: j + 1,
          is_thumbnail: j + 1 === variations[i].thumbnail ? true : false,
        })
      }
    }
  }

  pushURLs({
    category: 10101,
    serial: 1,
    variations: [
      {
        images: 6,
        thumbnail: 5,
      },
      {
        images: 6,
        thumbnail: 5,
      },
      {
        images: 6,
        thumbnail: 2,
      },
      {
        images: 6,
        thumbnail: 3,
      },
    ],
  })

  pushURLs({
    category: 10101,
    serial: 2,
    variations: [
      {
        images: 6,
        thumbnail: 1,
      },
      {
        images: 6,
        thumbnail: 5,
      },
      {
        images: 6,
        thumbnail: 2,
      },
      {
        images: 6,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10101,
    serial: 3,
    variations: [
      {
        images: 5,
        thumbnail: 3,
      },
      {
        images: 6,
        thumbnail: 4,
      },
      {
        images: 6,
        thumbnail: 3,
      },
      {
        images: 6,
        thumbnail: 3,
      },
    ],
  })

  pushURLs({
    category: 10101,
    serial: 4,
    variations: [
      {
        images: 5,
        thumbnail: 1,
      },
      {
        images: 5,
        thumbnail: 4,
      },
      {
        images: 5,
        thumbnail: 5,
      },
      {
        images: 5,
        thumbnail: 2,
      },
    ],
  })

  pushURLs({
    category: 10101,
    serial: 5,
    variations: [
      {
        images: 1,
        thumbnail: 1,
      },
      {
        images: 1,
        thumbnail: 1,
      },
      {
        images: 1,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10101,
    serial: 6,
    variations: [
      {
        images: 1,
        thumbnail: 1,
      },
      {
        images: 1,
        thumbnail: 1,
      },
      {
        images: 1,
        thumbnail: 1,
      },
      {
        images: 1,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10101,
    serial: 7,
    variations: [
      {
        images: 1,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10101,
    serial: 8,
    variations: [
      {
        images: 5,
        thumbnail: 3,
      },
      {
        images: 5,
        thumbnail: 4,
      },
      {
        images: 5,
        thumbnail: 5,
      },
    ],
  })

  pushURLs({
    category: 10101,
    serial: 9,
    variations: [
      {
        images: 5,
        thumbnail: 4,
      },
      {
        images: 5,
        thumbnail: 3,
      },
      {
        images: 5,
        thumbnail: 1,
      },
      {
        images: 5,
        thumbnail: 4,
      },
    ],
  })

  pushURLs({
    category: 10101,
    serial: 10,
    variations: [
      {
        images: 5,
        thumbnail: 3,
      },
      {
        images: 5,
        thumbnail: 5,
      },
      {
        images: 5,
        thumbnail: 2,
      },
      {
        images: 5,
        thumbnail: 2,
      },
    ],
  })

  pushURLs({
    category: 10101,
    serial: 11,
    variations: [
      {
        images: 3,
        thumbnail: 2,
      },
      {
        images: 1,
        thumbnail: 1,
      },
      {
        images: 4,
        thumbnail: 2,
      },
      {
        images: 4,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10101,
    serial: 12,
    variations: [
      {
        images: 1,
        thumbnail: 1,
      },
      {
        images: 3,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10102,
    serial: 1,
    variations: [
      {
        images: 4,
        thumbnail: 1,
      },
      {
        images: 4,
        thumbnail: 1,
      },
      {
        images: 4,
        thumbnail: 1,
      },
      {
        images: 4,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10102,
    serial: 2,
    variations: [
      {
        images: 4,
        thumbnail: 2,
      },
      {
        images: 4,
        thumbnail: 1,
      },
      {
        images: 4,
        thumbnail: 1,
      },
      {
        images: 5,
        thumbnail: 2,
      },
    ],
  })

  pushURLs({
    category: 10102,
    serial: 3,
    variations: [
      {
        images: 4,
        thumbnail: 1,
      },
      {
        images: 3,
        thumbnail: 2,
      },
    ],
  })

  pushURLs({
    category: 10102,
    serial: 4,
    variations: [
      {
        images: 3,
        thumbnail: 2,
      },
    ],
  })

  pushURLs({
    category: 10102,
    serial: 5,
    variations: [
      {
        images: 4,
        thumbnail: 4,
      },
      {
        images: 4,
        thumbnail: 4,
      },
    ],
  })

  pushURLs({
    category: 10102,
    serial: 6,
    variations: [
      {
        images: 4,
        thumbnail: 2,
      },
      {
        images: 4,
        thumbnail: 1,
      },
      {
        images: 4,
        thumbnail: 1,
      },
      {
        images: 5,
        thumbnail: 2,
      },
    ],
  })

  pushURLs({
    category: 10102,
    serial: 7,
    variations: [
      {
        images: 1,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10102,
    serial: 8,
    variations: [
      {
        images: 3,
        thumbnail: 2,
      },
      {
        images: 4,
        thumbnail: 1,
      },
      {
        images: 4,
        thumbnail: 4,
      },
    ],
  })

  pushURLs({
    category: 10102,
    serial: 9,
    variations: [
      {
        images: 2,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10201,
    serial: 1,
    variations: [
      {
        images: 3,
        thumbnail: 3,
      },
      {
        images: 3,
        thumbnail: 2,
      },
    ],
  })

  pushURLs({
    category: 10201,
    serial: 2,
    variations: [
      {
        images: 4,
        thumbnail: 4,
      },
      {
        images: 5,
        thumbnail: 5,
      },
      {
        images: 5,
        thumbnail: 5,
      },
      {
        images: 5,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10201,
    serial: 3,
    variations: [
      {
        images: 4,
        thumbnail: 3,
      },
      {
        images: 4,
        thumbnail: 3,
      },
      {
        images: 4,
        thumbnail: 3,
      },
      {
        images: 4,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10201,
    serial: 4,
    variations: [
      {
        images: 4,
        thumbnail: 2,
      },
    ],
  })

  pushURLs({
    category: 10201,
    serial: 5,
    variations: [
      {
        images: 4,
        thumbnail: 1,
      },
      {
        images: 5,
        thumbnail: 5,
      },
      {
        images: 4,
        thumbnail: 3,
      },
      {
        images: 4,
        thumbnail: 3,
      },
    ],
  })

  pushURLs({
    category: 10201,
    serial: 6,
    variations: [
      {
        images: 1,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10201,
    serial: 7,
    variations: [
      {
        images: 4,
        thumbnail: 2,
      },
      {
        images: 3,
        thumbnail: 1,
      },
      {
        images: 3,
        thumbnail: 2,
      },
      {
        images: 2,
        thumbnail: 2,
      },
    ],
  })

  pushURLs({
    category: 10201,
    serial: 8,
    variations: [
      {
        images: 4,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10201,
    serial: 9,
    variations: [
      {
        images: 4,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10201,
    serial: 10,
    variations: [
      {
        images: 2,
        thumbnail: 2,
      },
      {
        images: 2,
        thumbnail: 2,
      },
      {
        images: 2,
        thumbnail: 2,
      },
    ],
  })

  pushURLs({
    category: 10202,
    serial: 1,
    variations: [
      {
        images: 3,
        thumbnail: 3,
      },
    ],
  })

  pushURLs({
    category: 10202,
    serial: 2,
    variations: [
      {
        images: 3,
        thumbnail: 2,
      },
    ],
  })

  pushURLs({
    category: 10202,
    serial: 3,
    variations: [
      {
        images: 2,
        thumbnail: 2,
      },
      {
        images: 3,
        thumbnail: 2,
      },
    ],
  })

  pushURLs({
    category: 10202,
    serial: 4,
    variations: [
      {
        images: 3,
        thumbnail: 2,
      },
    ],
  })

  pushURLs({
    category: 10202,
    serial: 5,
    variations: [
      {
        images: 5,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10202,
    serial: 6,
    variations: [
      {
        images: 3,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10202,
    serial: 7,
    variations: [
      {
        images: 3,
        thumbnail: 1,
      },
      {
        images: 3,
        thumbnail: 1,
      },
      {
        images: 3,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10202,
    serial: 8,
    variations: [
      {
        images: 3,
        thumbnail: 1,
      },
      {
        images: 3,
        thumbnail: 1,
      },
    ],
  })

  pushURLs({
    category: 10202,
    serial: 9,
    variations: [
      {
        images: 2,
        thumbnail: 2,
      },
    ],
  })

  pushURLs({
    category: 10202,
    serial: 10,
    variations: [
      {
        images: 4,
        thumbnail: 2,
      },
      {
        images: 5,
        thumbnail: 5,
      },
      {
        images: 4,
        thumbnail: 1,
      },
      {
        images: 4,
        thumbnail: 2,
      },
    ],
  })

  pushURLs({
    category: 10202,
    serial: 11,
    variations: [
      {
        images: 6,
        thumbnail: 6,
      },
    ],
  })

  return itemsImageURLArr
}
