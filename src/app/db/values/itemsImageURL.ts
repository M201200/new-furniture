import { ItemsImageURL } from "../schema"

type imagesInfo = {
  category: number
  serial: number
  variations: number[]
}

export const itemsImageURLArr = getItemsImageURLArr()

function getItemsImageURLArr() {
  let itemsImageURLArr: ItemsImageURL[] = []

  function pushURLs({ category, serial, variations }: imagesInfo) {
    for (let i = 0; i < variations.length; i++) {
      for (let j = 0; j < variations[i]; j++) {
        itemsImageURLArr.push({
          category_code: category,
          item_serial_number: serial,
          item_variation: "c" + i + "m0w0h0d0",
          image_number: j + 1,
        })
      }
    }
  }

  pushURLs({
    category: 10101,
    serial: 1,
    variations: [6, 6, 6, 6],
  })

  pushURLs({
    category: 10101,
    serial: 2,
    variations: [6, 6, 6, 6],
  })

  pushURLs({
    category: 10101,
    serial: 3,
    variations: [5, 6, 6, 6],
  })

  pushURLs({
    category: 10101,
    serial: 4,
    variations: [5, 5, 5, 5],
  })

  pushURLs({
    category: 10101,
    serial: 5,
    variations: [1, 1, 1],
  })

  pushURLs({
    category: 10101,
    serial: 6,
    variations: [1, 1, 1, 1],
  })

  pushURLs({
    category: 10101,
    serial: 7,
    variations: [1],
  })

  pushURLs({
    category: 10101,
    serial: 8,
    variations: [5, 5, 5],
  })

  pushURLs({
    category: 10101,
    serial: 9,
    variations: [5, 5, 5, 5],
  })

  pushURLs({
    category: 10101,
    serial: 10,
    variations: [5, 5, 5, 5],
  })

  pushURLs({
    category: 10101,
    serial: 11,
    variations: [3, 1, 4, 4],
  })

  pushURLs({
    category: 10101,
    serial: 12,
    variations: [1, 3],
  })

  pushURLs({
    category: 10102,
    serial: 1,
    variations: [4, 4, 4, 4],
  })

  pushURLs({
    category: 10102,
    serial: 2,
    variations: [4, 4, 4, 5],
  })

  pushURLs({
    category: 10102,
    serial: 3,
    variations: [4, 3],
  })

  pushURLs({
    category: 10102,
    serial: 4,
    variations: [3],
  })

  pushURLs({
    category: 10102,
    serial: 5,
    variations: [4, 4],
  })

  pushURLs({
    category: 10102,
    serial: 6,
    variations: [4, 4, 4, 5],
  })

  pushURLs({
    category: 10102,
    serial: 7,
    variations: [1],
  })

  pushURLs({
    category: 10102,
    serial: 8,
    variations: [3, 4, 4],
  })

  pushURLs({
    category: 10102,
    serial: 9,
    variations: [2],
  })

  pushURLs({
    category: 10201,
    serial: 1,
    variations: [3, 3],
  })

  pushURLs({
    category: 10201,
    serial: 2,
    variations: [4, 5, 5, 5],
  })

  pushURLs({
    category: 10201,
    serial: 3,
    variations: [4, 4, 4, 4],
  })

  pushURLs({
    category: 10201,
    serial: 4,
    variations: [4],
  })

  pushURLs({
    category: 10201,
    serial: 5,
    variations: [4, 5, 4, 4],
  })

  pushURLs({
    category: 10201,
    serial: 6,
    variations: [1],
  })

  pushURLs({
    category: 10201,
    serial: 7,
    variations: [4, 3, 3, 2],
  })

  pushURLs({
    category: 10201,
    serial: 8,
    variations: [4],
  })

  pushURLs({
    category: 10201,
    serial: 9,
    variations: [4],
  })

  pushURLs({
    category: 10201,
    serial: 10,
    variations: [2, 2, 2],
  })

  pushURLs({
    category: 10202,
    serial: 1,
    variations: [3],
  })

  pushURLs({
    category: 10202,
    serial: 2,
    variations: [3],
  })

  pushURLs({
    category: 10202,
    serial: 3,
    variations: [2, 3],
  })

  pushURLs({
    category: 10202,
    serial: 4,
    variations: [3],
  })

  pushURLs({
    category: 10202,
    serial: 5,
    variations: [5],
  })

  pushURLs({
    category: 10202,
    serial: 6,
    variations: [3],
  })

  pushURLs({
    category: 10202,
    serial: 7,
    variations: [3, 3, 3],
  })

  pushURLs({
    category: 10202,
    serial: 8,
    variations: [3, 3],
  })

  pushURLs({
    category: 10202,
    serial: 9,
    variations: [2],
  })

  pushURLs({
    category: 10202,
    serial: 10,
    variations: [4, 5, 4, 4],
  })

  pushURLs({
    category: 10202,
    serial: 11,
    variations: [6],
  })

  pushURLs({
    category: 10203,
    serial: 1,
    variations: [2, 2],
  })

  pushURLs({
    category: 10203,
    serial: 2,
    variations: [4],
  })

  pushURLs({
    category: 10203,
    serial: 3,
    variations: [4, 4, 4],
  })

  pushURLs({
    category: 10203,
    serial: 4,
    variations: [4, 3, 4],
  })

  pushURLs({
    category: 10203,
    serial: 5,
    variations: [5, 4, 4],
  })

  pushURLs({
    category: 10301,
    serial: 1,
    variations: [2],
  })

  pushURLs({
    category: 10301,
    serial: 2,
    variations: [5, 5, 5],
  })

  pushURLs({
    category: 10301,
    serial: 3,
    variations: [3],
  })

  pushURLs({
    category: 10301,
    serial: 4,
    variations: [5, 4, 5],
  })

  pushURLs({
    category: 10301,
    serial: 5,
    variations: [4],
  })

  pushURLs({
    category: 10301,
    serial: 6,
    variations: [4],
  })

  pushURLs({
    category: 10302,
    serial: 1,
    variations: [3, 3],
  })

  pushURLs({
    category: 10302,
    serial: 2,
    variations: [5, 5, 5],
  })

  pushURLs({
    category: 10302,
    serial: 3,
    variations: [3, 3],
  })

  pushURLs({
    category: 10302,
    serial: 4,
    variations: [5, 5, 5],
  })

  pushURLs({
    category: 10302,
    serial: 5,
    variations: [2, 2],
  })

  pushURLs({
    category: 10302,
    serial: 6,
    variations: [1, 1, 1],
  })

  pushURLs({
    category: 10303,
    serial: 1,
    variations: [3, 4],
  })

  pushURLs({
    category: 10303,
    serial: 2,
    variations: [2],
  })

  pushURLs({
    category: 10303,
    serial: 3,
    variations: [4, 4],
  })

  pushURLs({
    category: 10303,
    serial: 4,
    variations: [2],
  })

  pushURLs({
    category: 10303,
    serial: 5,
    variations: [2],
  })

  pushURLs({
    category: 10303,
    serial: 6,
    variations: [2],
  })

  pushURLs({
    category: 10401,
    serial: 1,
    variations: [5, 5, 5],
  })

  pushURLs({
    category: 10401,
    serial: 2,
    variations: [2],
  })

  pushURLs({
    category: 10401,
    serial: 3,
    variations: [4, 4],
  })

  pushURLs({
    category: 10401,
    serial: 4,
    variations: [5, 3],
  })

  pushURLs({
    category: 10401,
    serial: 5,
    variations: [3],
  })

  pushURLs({
    category: 10402,
    serial: 1,
    variations: [5, 5, 4],
  })

  pushURLs({
    category: 10402,
    serial: 2,
    variations: [2],
  })

  pushURLs({
    category: 10402,
    serial: 3,
    variations: [4],
  })

  pushURLs({
    category: 10402,
    serial: 4,
    variations: [5],
  })

  pushURLs({
    category: 10402,
    serial: 5,
    variations: [3],
  })

  pushURLs({
    category: 10403,
    serial: 1,
    variations: [4, 5, 5],
  })

  pushURLs({
    category: 10403,
    serial: 2,
    variations: [4],
  })

  pushURLs({
    category: 10403,
    serial: 3,
    variations: [4, 5, 5],
  })

  pushURLs({
    category: 10403,
    serial: 4,
    variations: [2],
  })

  pushURLs({
    category: 10403,
    serial: 5,
    variations: [4],
  })

  pushURLs({
    category: 10501,
    serial: 1,
    variations: [3, 3],
  })

  pushURLs({
    category: 10501,
    serial: 2,
    variations: [2, 3],
  })

  pushURLs({
    category: 10501,
    serial: 3,
    variations: [3],
  })

  pushURLs({
    category: 10502,
    serial: 1,
    variations: [3],
  })

  pushURLs({
    category: 10502,
    serial: 2,
    variations: [2],
  })

  pushURLs({
    category: 10502,
    serial: 3,
    variations: [2],
  })

  pushURLs({
    category: 10502,
    serial: 4,
    variations: [1],
  })

  return itemsImageURLArr
}
