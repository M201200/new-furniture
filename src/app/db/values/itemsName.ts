import { ItemsName } from "../schema"
import { itemsArr } from "./items"

const itemsNameBasis: ItemsName[] = [
  {
    vendor_code: "10101-1",
    en: "Straight Sofa Bed FAMILY 1",
    ro: "Canapea extensibilă dreaptă FAMILY 1",
    ru: "Диван-кровать прямой FAMILY 1",
  },
  {
    vendor_code: "10101-2",
    en: "Straight Sofa Bed FAMILY 2",
    ro: "Canapea extensibilă dreaptă FAMILY 2",
    ru: "Диван-кровать прямой FAMILY 2",
  },
  {
    vendor_code: "10101-3",
    en: "Straight Sofa Bed FAMILY 3",
    ro: "Canapea extensibilă dreaptă FAMILY 3",
    ru: "Диван-кровать прямой FAMILY 3",
  },
  {
    vendor_code: "10101-4",
    en: "Straight Sofa Bed FAMILY 4",
    ro: "Canapea extensibilă dreaptă FAMILY 4",
    ru: "Диван-кровать прямой FAMILY 4",
  },
  {
    vendor_code: "10101-5",
    en: "Sofa Bed Karina 1",
    ro: "Canapea Karina 1",
    ru: "Диван-кровать Карина 1",
  },
  {
    vendor_code: "10101-6",
    en: "Straight Sofa Bed Baron 4",
    ro: "Canapea extensibilă dreaptă Baron 4",
    ru: "Диван-кровать прямой Baron 4",
  },
  {
    vendor_code: "10101-7",
    en: "Straight sofa Combo 1",
    ro: "Canapea dreaptă Combo 1",
    ru: "Прямой диван Комби 1",
  },
  {
    vendor_code: "10101-8",
    en: "Sofa Olimp 1",
    ro: "Canapea Olimp 1",
    ru: "Диван-кровать Олимп 1",
  },
  {
    vendor_code: "10101-9",
    en: "Straight sofa Moon 1",
    ro: "Canapea dreaptă Moon 1",
    ru: "Прямой диван Moon 1",
  },
  {
    vendor_code: "10101-10",
    en: "Sofa Olimp 2",
    ro: "Canapea Olimp 2",
    ru: "Диван-кровать Олимп 2",
  },
  {
    vendor_code: "10101-11",
    en: "Futon Couch 1",
    ro: "Canapea extensibilă 1",
    ru: "Диван-книжка 1",
  },
  {
    vendor_code: "10101-12",
    en: "Straight Sofa Comfort 1",
    ro: "Canapea dreaptă Comfort 1",
    ru: "Прямой диван Комфорт 1",
  },
  {
    vendor_code: "10102-1",
    en: "Chair-bed Acrobat Lux 1",
    ro: "Scaun-pat Acrobat Lux 1",
    ru: "Кресло-кровать Акробат Люкс 1",
  },
  {
    vendor_code: "10102-2",
    en: "Soft Armchair Fantasizer 1",
    ro: "Fotoliu moale Fantazator 1",
    ru: "Кресло мягкое Фантазёр 1",
  },
  {
    vendor_code: "10102-3",
    en: "Folding Chair Munich 1",
    ro: "Scaun pliabil München 1",
    ru: "Кресло раскладное Мюнхен 1",
  },
  {
    vendor_code: "10102-4",
    en: "Loft Armchair 1",
    ro: "Fotoliu Loft 1",
    ru: "Кресло Лофт 1",
  },
  {
    vendor_code: "10102-5",
    en: "Dallas Armchair 1",
    ro: "Fotoliu Dallas 1",
    ru: "Кресло Далас 1",
  },
  {
    vendor_code: "10102-6",
    en: "Pause Soft Armchair 1",
    ro: "Fotoliu moale Pauză 1",
    ru: "Кресло мягкое Пауза 1",
  },
  {
    vendor_code: "10102-7",
    en: "Amsterdam Armchair 1",
    ro: "Fotoliu Amsterdam 1",
    ru: "Кресло Амстердам 1",
  },
  {
    vendor_code: "10102-8",
    en: "POANG chair 1",
    ro: "Fotoliul POANG 1",
    ru: "Кресло POANG 1",
  },
  {
    vendor_code: "10102-9",
    en: "Levita Soft Armchair 1",
    ro: "Fotoliu moale Levita 1",
    ru: "Кресло мягкое Левита 1",
  },
  {
    vendor_code: "10201-1",
    en: "Kay Chair 1",
    ro: "Scaun Kay 1",
    ru: "Стул Kay 1",
  },
  {
    vendor_code: "10201-2",
    en: "Ingolt Chair 1",
    ro: "Scaun Ingolt 1",
    ru: "Стул Ингольт 1",
  },
  {
    vendor_code: "10201-3",
    en: "Scaun quiz 1",
    ro: "Quiz chair 1",
    ru: "Стул квиз 1",
  },
  {
    vendor_code: "10201-4",
    en: "Evelina Chair 1",
    ro: "Scaunul Evelina 1",
    ru: "Стул ЭВЕЛИНА 1",
  },
  {
    vendor_code: "10201-5",
    en: "DOBRIN BARNY Bar Stool 1",
    ro: "Scaun de bar DOBRIN BARNY 1",
    ru: "Стул барный DOBRIN BARNY 1",
  },
  {
    vendor_code: "10201-6",
    en: "Soft Armchair HESBY 1",
    ro: "Scaun fotoliu moale HESBY 1",
    ru: "Мягкий стул-кресло HESBY 1",
  },
  {
    vendor_code: "10201-7",
    en: "Milana 1 Chai",
    ro: "Scaun Milana 1",
    ru: "Стул Милана 1",
  },
  {
    vendor_code: "10201-8",
    en: "Kitchen Chair 1",
    ro: "Scaun pentru bucătărie 1",
    ru: "Стул для кухни 1",
  },
  {
    vendor_code: "10201-9",
    en: "Stefano Designer Armchair 1",
    ro: "Fotoliu designer Stefano 1",
    ru: "Стул-кресло дизайнерский Стефано 1",
  },
  {
    vendor_code: "10201-10",
    en: "Kitchen Chair 2",
    ro: "Scaun pentru bucătărie 2",
    ru: "Стул для кухни 2",
  },
  {
    vendor_code: "10202-1",
    en: "Bar table 1",
    ro: "Bar de masă 1",
    ru: "Барный стол 1",
  },
  {
    vendor_code: "10202-2",
    en: "Coffee table 1",
    ro: "Masă de cafea 1",
    ru: "Журнальный стол 1",
  },
  {
    vendor_code: "10202-3",
    en: "Dining table 1",
    ro: "Masă de cină 1",
    ru: "Стол обеденный 1",
  },
  {
    vendor_code: "10202-4",
    en: "Coffee table 2",
    ro: "Masă de cafea 2",
    ru: "Журнальный стол 2",
  },
  {
    vendor_code: "10202-5",
    en: "Dining table 2",
    ro: "Masă de cină 2",
    ru: "Стол обеденный 2",
  },
  {
    vendor_code: "10202-6",
    en: "Kitchen Chair 3",
    ro: "Scaun pentru bucătărie 3",
    ru: "Стул для кухни 3",
  },
  {
    vendor_code: "10202-7",
    en: "Coffee table 3",
    ro: "Masă de cafea 3",
    ru: "Журнальный стол 3",
  },
  {
    vendor_code: "10202-8",
    en: "Стеклянный стол Атрей",
    ro: " Masă de sticlă Atray 1",
    ru: "Glass table Atray 1",
  },
  {
    vendor_code: "10202-9",
    en: "Dining table 3",
    ro: "Masă de cină 3",
    ru: "Стол обеденный 3",
  },
  {
    vendor_code: "10202-10",
    en: "Dining table 3",
    ro: "Masă de cină 3",
    ru: "Стол обеденный 3",
  },
  {
    vendor_code: "10202-11",
    en: "Folding garden table 1",
    ro: "Masă pliabilă de grădină 1",
    ru: "Стол складной садовый 1",
  },
]

const itemsNameArr: ItemsName[] = []

for (let i = 0; i < itemsArr.length; i++) {
  const names = itemsNameBasis.find(
    (el) =>
      el.vendor_code ===
      `${itemsArr[i].category_code}-${itemsArr[i].serial_number}`
  )
  itemsNameArr.push({
    vendor_code: `${itemsArr[i].category_code}-${itemsArr[i].serial_number}-${itemsArr[i].variation}`,
    en: `${names?.en} (${itemsArr[i].variation})`,
    ro: `${names?.ro} (${itemsArr[i].variation})`,
    ru: `${names?.ru} (${itemsArr[i].variation})`,
  })
}

export { itemsNameArr }
