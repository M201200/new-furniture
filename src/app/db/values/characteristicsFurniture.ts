import { CharacteristicsFurniture } from "../schema"
import { ColorName } from "./colors"
import { MaterialName } from "./materials"

type CharacteristicsSpecified = {
  vendor_code: string
  color: ColorName
  material: MaterialName
  width: number
  height: number
  depth: number
  weight: number
  folding: boolean
  warranty: number
  id?: number | undefined
  created_at?: Date | undefined
  updated_at?: string | null | undefined
}

export const characteristicsFurnitureArr: CharacteristicsFurniture[] = [
  {
    vendor_code: "10101-1-c0m0w0h0d0",
    color: "beige",
    material: "micro_velvet",
    width: 241,
    height: 94,
    depth: 108,
    weight: 15,
    folding: true,
    warranty: 18,
  },
  {
    vendor_code: "10101-1-c1m0w0h0d0",
    color: "burgundy",
    material: "micro_velvet",
    width: 241,
    height: 94,
    depth: 108,
    weight: 15,
    folding: true,
    warranty: 18,
  },
  {
    vendor_code: "10101-1-c2m0w0h0d0",
    color: "green",
    material: "micro_velvet",
    width: 241,
    height: 94,
    depth: 108,
    weight: 15,
    folding: true,
    warranty: 18,
  },
  {
    vendor_code: "10101-1-c3m0w0h0d0",
    color: "blue",
    material: "micro_velvet",
    width: 241,
    height: 94,
    depth: 108,
    weight: 15,
    folding: true,
    warranty: 18,
  },
  {
    vendor_code: "10101-2-c0m0w0h0d0",
    color: "light-beige",
    material: "micro_velvet",
    width: 219,
    height: 92,
    depth: 107,
    weight: 12,
    folding: true,
    warranty: 18,
  },
  {
    vendor_code: "10101-2-c1m0w0h0d0",
    color: "turquoise",
    material: "micro_velvet",
    width: 219,
    height: 92,
    depth: 107,
    weight: 12,
    folding: true,
    warranty: 18,
  },
  {
    vendor_code: "10101-2-c2m0w0h0d0",
    color: "green",
    material: "micro_velvet",
    width: 219,
    height: 92,
    depth: 107,
    weight: 12,
    folding: true,
    warranty: 18,
  },
  {
    vendor_code: "10101-2-c3m0w0h0d0",
    color: "blue",
    material: "micro_velvet",
    width: 219,
    height: 92,
    depth: 107,
    weight: 12,
    folding: true,
    warranty: 18,
  },
  {
    vendor_code: "10101-3-c0m0w0h0d0",
    color: "pink",
    material: "micro_velvet",
    width: 155,
    height: 84,
    depth: 85,
    weight: 12,
    folding: true,
    warranty: 18,
  },
  {
    vendor_code: "10101-3-c1m0w0h0d0",
    color: "beige",
    material: "micro_velvet",
    width: 155,
    height: 84,
    depth: 85,
    weight: 12,
    folding: true,
    warranty: 18,
  },
  {
    vendor_code: "10101-3-c2m0w0h0d0",
    color: "light-gray",
    material: "micro_velvet",
    width: 155,
    height: 84,
    depth: 85,
    weight: 12,
    folding: true,
    warranty: 18,
  },
  {
    vendor_code: "10101-3-c3m0w0h0d0",
    color: "yellow",
    material: "micro_velvet",
    width: 155,
    height: 84,
    depth: 85,
    weight: 12,
    folding: true,
    warranty: 18,
  },
  {
    vendor_code: "10101-4-c0m0w0h0d0",
    color: "gray",
    material: "micro_velvet",
    width: 223,
    height: 84,
    depth: 150,
    weight: 20,
    folding: true,
    warranty: 12,
  },
  {
    vendor_code: "10101-4-c1m0w0h0d0",
    color: "yellow",
    material: "micro_velvet",
    width: 223,
    height: 84,
    depth: 150,
    weight: 20,
    folding: true,
    warranty: 12,
  },
  {
    vendor_code: "10101-4-c2m0w0h0d0",
    color: "brown",
    material: "micro_velvet",
    width: 223,
    height: 84,
    depth: 150,
    weight: 20,
    folding: true,
    warranty: 12,
  },
  {
    vendor_code: "10101-4-c3m0w0h0d0",
    color: "beige",
    material: "micro_velvet",
    width: 223,
    height: 84,
    depth: 150,
    weight: 20,
    folding: true,
    warranty: 12,
  },
  {
    vendor_code: "10101-5-c0m0w0h0d0",
    color: "dark-gray",
    material: "micro_velvet",
    width: 210,
    height: 88,
    depth: 100,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-5-c0m0w1h0d0",
    color: "dark-gray",
    material: "micro_velvet",
    width: 150,
    height: 88,
    depth: 100,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-5-c0m0w2h0d0",
    color: "dark-gray",
    material: "micro_velvet",
    width: 170,
    height: 88,
    depth: 100,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-5-c0m0w3h0d0",
    color: "dark-gray",
    material: "micro_velvet",
    width: 185,
    height: 88,
    depth: 100,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-5-c1m0w0h0d0",
    color: "gray",
    material: "micro_velvet",
    width: 210,
    height: 88,
    depth: 100,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-5-c1m0w1h0d0",
    color: "gray",
    material: "micro_velvet",
    width: 150,
    height: 88,
    depth: 100,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-5-c1m0w2h0d0",
    color: "gray",
    material: "micro_velvet",
    width: 170,
    height: 88,
    depth: 100,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-5-c1m0w3h0d0",
    color: "gray",
    material: "micro_velvet",
    width: 185,
    height: 88,
    depth: 100,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-5-c2m0w0h0d0",
    color: "beige",
    material: "micro_velvet",
    width: 210,
    height: 88,
    depth: 100,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-5-c2m0w1h0d0",
    color: "beige",
    material: "micro_velvet",
    width: 150,
    height: 88,
    depth: 100,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-5-c2m0w2h0d0",
    color: "beige",
    material: "micro_velvet",
    width: 170,
    height: 88,
    depth: 100,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-5-c2m0w3h0d0",
    color: "beige",
    material: "micro_velvet",
    width: 185,
    height: 88,
    depth: 100,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-6-c0m0w0h0d0",
    color: "gray",
    material: "flock",
    width: 220,
    height: 73,
    depth: 92,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-6-c1m0w0h0d0",
    color: "blue",
    material: "flock",
    width: 220,
    height: 73,
    depth: 92,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-6-c2m0w0h0d0",
    color: "green",
    material: "flock",
    width: 220,
    height: 73,
    depth: 92,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-6-c3m0w0h0d0",
    color: "beige",
    material: "flock",
    width: 220,
    height: 73,
    depth: 92,
    weight: 25,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-7-c0m0w0h0d0",
    color: "zebra",
    material: "velvet",
    width: 210,
    height: 102,
    depth: 92,
    weight: 20,
    folding: true,
    warranty: 16,
  },
  {
    vendor_code: "10101-8-c0m0w0h0d0",
    color: "blue",
    material: "micro-flock",
    width: 210,
    height: 92,
    depth: 92,
    weight: 15,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-8-c1m0w0h0d0",
    color: "gray",
    material: "micro-flock",
    width: 210,
    height: 92,
    depth: 92,
    weight: 15,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-8-c2m0w0h0d0",
    color: "brown",
    material: "micro-flock",
    width: 210,
    height: 92,
    depth: 92,
    weight: 15,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-9-c0m0w0h0d0",
    color: "yellow",
    material: "eco-leather",
    width: 80,
    height: 63,
    depth: 76,
    weight: 10,
    folding: false,
    warranty: 18,
  },
  {
    vendor_code: "10101-9-c1m0w0h0d0",
    color: "black",
    material: "eco-leather",
    width: 80,
    height: 63,
    depth: 76,
    weight: 10,
    folding: false,
    warranty: 18,
  },
  {
    vendor_code: "10101-9-c2m0w0h0d0",
    color: "blue",
    material: "eco-leather",
    width: 80,
    height: 63,
    depth: 76,
    weight: 10,
    folding: false,
    warranty: 18,
  },
  {
    vendor_code: "10101-9-c3m0w0h0d0",
    color: "beige",
    material: "eco-leather",
    width: 80,
    height: 63,
    depth: 76,
    weight: 10,
    folding: false,
    warranty: 18,
  },
  {
    vendor_code: "10101-10-c0m0w0h0d0",
    color: "blue",
    material: "micro-flock",
    width: 210,
    height: 92,
    depth: 92,
    weight: 18,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-10-c1m0w0h0d0",
    color: "brown",
    material: "micro-flock",
    width: 210,
    height: 92,
    depth: 92,
    weight: 18,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-10-c2m0w0h0d0",
    color: "beige",
    material: "micro-flock",
    width: 210,
    height: 92,
    depth: 92,
    weight: 18,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-10-c3m0w0h0d0",
    color: "gray",
    material: "micro-flock",
    width: 210,
    height: 92,
    depth: 92,
    weight: 18,
    folding: true,
    warranty: 24,
  },
  {
    vendor_code: "10101-11-c0m0w0h0d0",
    color: "light-brown",
    material: "matting",
    width: 210,
    height: 102,
    depth: 92,
    weight: 25,
    folding: true,
    warranty: 16,
  },
  {
    vendor_code: "10101-11-c1m0w0h0d0",
    color: "light-beige",
    material: "matting",
    width: 210,
    height: 102,
    depth: 92,
    weight: 25,
    folding: true,
    warranty: 16,
  },
  {
    vendor_code: "10101-11-c2m0w0h0d0",
    color: "brown",
    material: "matting",
    width: 210,
    height: 102,
    depth: 92,
    weight: 25,
    folding: true,
    warranty: 16,
  },
  {
    vendor_code: "10101-11-c3m0w0h0d0",
    color: "gray",
    material: "matting",
    width: 210,
    height: 102,
    depth: 92,
    weight: 25,
    folding: true,
    warranty: 16,
  },
  {
    vendor_code: "10101-12-c0m0w0h0d0",
    color: "gray",
    material: "velvet",
    width: 210,
    height: 102,
    depth: 92,
    weight: 20,
    folding: true,
    warranty: 16,
  },
  {
    vendor_code: "10101-12-c1m0w0h0d0",
    color: "green",
    material: "velvet",
    width: 210,
    height: 102,
    depth: 92,
    weight: 20,
    folding: true,
    warranty: 16,
  },
  {
    vendor_code: "10102-1-c0m0w0h0d0",
    color: "dark-beige",
    material: "micro_velvet",
    width: 75,
    height: 85,
    depth: 85,
    weight: 23,
    folding: true,
    warranty: 12,
  },
  {
    vendor_code: "10102-1-c1m0w0h0d0",
    color: "blue",
    material: "micro_velvet",
    width: 75,
    height: 85,
    depth: 85,
    weight: 23,
    folding: true,
    warranty: 12,
  },
  {
    vendor_code: "10102-1-c2m0w0h0d0",
    color: "yellow",
    material: "micro_velvet",
    width: 75,
    height: 85,
    depth: 85,
    weight: 23,
    folding: true,
    warranty: 12,
  },
  {
    vendor_code: "10102-1-c3m0w0h0d0",
    color: "brown",
    material: "micro_velvet",
    width: 75,
    height: 85,
    depth: 85,
    weight: 23,
    folding: true,
    warranty: 12,
  },
  {
    vendor_code: "10102-2-c0m0w0h0d0",
    color: "green",
    material: "matting",
    width: 77,
    height: 98,
    depth: 90,
    weight: 22,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10102-2-c1m0w0h0d0",
    color: "blue",
    material: "matting",
    width: 77,
    height: 98,
    depth: 90,
    weight: 22,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10102-2-c2m0w0h0d0",
    color: "white",
    material: "matting",
    width: 77,
    height: 98,
    depth: 90,
    weight: 22,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10102-2-c3m0w0h0d0",
    color: "red",
    material: "matting",
    width: 77,
    height: 98,
    depth: 90,
    weight: 22,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10102-3-c0m0w0h0d0",
    color: "gray",
    material: "matting",
    width: 90,
    height: 90,
    depth: 87,
    weight: 18,
    folding: true,
    warranty: 12,
  },
  {
    vendor_code: "10102-3-c1m0w0h0d0",
    color: "beige",
    material: "matting",
    width: 90,
    height: 90,
    depth: 87,
    weight: 18,
    folding: true,
    warranty: 12,
  },
  {
    vendor_code: "10102-4-c0m0w0h0d0",
    color: "beige",
    material: "eco-leather",
    width: 60,
    height: 74,
    depth: 60,
    weight: 15,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10102-5-c0m0w0h0d0",
    color: "light-gray",
    material: "matting",
    width: 64,
    height: 91,
    depth: 78,
    weight: 12,
    folding: false,
    warranty: 18,
  },
  {
    vendor_code: "10102-5-c1m0w0h0d0",
    color: "light-brown",
    material: "matting",
    width: 64,
    height: 91,
    depth: 78,
    weight: 12,
    folding: false,
    warranty: 18,
  },

  {
    vendor_code: "10102-6-c0m0w0h0d0",
    color: "red",
    material: "eco-leather",
    width: 90,
    height: 78,
    depth: 68,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10102-6-c1m0w0h0d0",
    color: "brown",
    material: "eco-leather",
    width: 90,
    height: 78,
    depth: 68,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10102-6-c2m0w0h0d0",
    color: "blue",
    material: "eco-leather",
    width: 90,
    height: 78,
    depth: 68,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10102-6-c3m0w0h0d0",
    color: "green",
    material: "eco-leather",
    width: 90,
    height: 78,
    depth: 68,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10102-7-c0m0w0h0d0",
    color: "brown",
    material: "matting",
    width: 90,
    height: 92,
    depth: 80,
    weight: 25,
    folding: false,
    warranty: 16,
  },
  {
    vendor_code: "10102-8-c0m0w0h0d0",
    color: "black",
    material: "textile",
    width: 55,
    height: 77,
    depth: 50,
    weight: 1,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10102-8-c1m0w0h0d0",
    color: "dark-blue",
    material: "textile",
    width: 55,
    height: 77,
    depth: 50,
    weight: 1,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10102-8-c2m0w0h0d0",
    color: "gray",
    material: "textile",
    width: 55,
    height: 77,
    depth: 50,
    weight: 1,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10102-9-c0m0w0h0d0",
    color: "beige",
    material: "matting",
    width: 67,
    height: 100,
    depth: 80,
    weight: 13,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10201-1-c0m0w0h0d0",
    color: "light-gray",
    material: "cloth",
    width: 51,
    height: 69,
    depth: 58,
    weight: 8,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10201-1-c1m0w0h0d0",
    color: "gray",
    material: "cloth",
    width: 51,
    height: 69,
    depth: 58,
    weight: 8,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10201-2-c0m0w0h0d0",
    color: "white",
    material: "wood",
    width: 40,
    height: 91,
    depth: 53,
    weight: 7,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10201-2-c1m0w0h0d0",
    color: "brown",
    material: "wood",
    width: 40,
    height: 91,
    depth: 53,
    weight: 7,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10201-2-c2m0w0h0d0",
    color: "black",
    material: "wood",
    width: 40,
    height: 91,
    depth: 53,
    weight: 7,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10201-2-c3m0w0h0d0",
    color: "beige",
    material: "wood",
    width: 40,
    height: 91,
    depth: 53,
    weight: 7,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10201-3-c0m0w0h0d0",
    color: "black",
    material: "micro_velvet",
    width: 56,
    height: 85,
    depth: 52,
    weight: 4,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10201-3-c1m0w0h0d0",
    color: "beige",
    material: "micro_velvet",
    width: 56,
    height: 85,
    depth: 52,
    weight: 4,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10201-3-c2m0w0h0d0",
    color: "black",
    material: "micro_velvet",
    width: 56,
    height: 85,
    depth: 52,
    weight: 4,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10201-3-c3m0w0h0d0",
    color: "gray",
    material: "micro_velvet",
    width: 56,
    height: 85,
    depth: 52,
    weight: 4,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10201-4-c0m0w0h0d0",
    color: "gray",
    material: "micro_velvet",
    width: 47,
    height: 93,
    depth: 51,
    weight: 4,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10201-5-c0m0w0h0d0",
    color: "gray",
    material: "eco-leather",
    width: 46,
    height: 110,
    depth: 54,
    weight: 7,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10201-5-c1m0w0h0d0",
    color: "blue",
    material: "eco-leather",
    width: 46,
    height: 110,
    depth: 54,
    weight: 7,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10201-5-c2m0w0h0d0",
    color: "purple",
    material: "eco-leather",
    width: 46,
    height: 110,
    depth: 54,
    weight: 7,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10201-5-c3m0w0h0d0",
    color: "white",
    material: "eco-leather",
    width: 46,
    height: 110,
    depth: 54,
    weight: 7,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10201-6-c0m0w0h0d0",
    color: "gray",
    material: "velvet",
    width: 59,
    height: 88,
    depth: 50,
    weight: 7,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10201-7-c0m0w0h0d0",
    color: "black",
    material: "velvet",
    width: 44,
    height: 89,
    depth: 40,
    weight: 5,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10201-7-c1m0w0h0d0",
    color: "green",
    material: "velvet",
    width: 44,
    height: 89,
    depth: 40,
    weight: 5,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10201-7-c2m0w0h0d0",
    color: "yellow",
    material: "velvet",
    width: 44,
    height: 89,
    depth: 40,
    weight: 5,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10201-7-c3m0w0h0d0",
    color: "brown",
    material: "velvet",
    width: 44,
    height: 89,
    depth: 40,
    weight: 5,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10201-8-c0m0w0h0d0",
    color: "black",
    material: "eco-leather",
    width: 42,
    height: 98,
    depth: 41,
    weight: 5,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10201-9-c0m0w0h0d0",
    color: "pink",
    material: "velvet",
    width: 46,
    height: 80,
    depth: 48,
    weight: 3,
    folding: false,
    warranty: 1,
  },
  {
    vendor_code: "10201-10-c0m0w0h0d0",
    color: "beige",
    material: "eco-leather",
    width: 52,
    height: 91,
    depth: 38,
    weight: 4,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10201-10-c1m0w0h0d0",
    color: "brown",
    material: "eco-leather",
    width: 52,
    height: 91,
    depth: 38,
    weight: 4,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10201-10-c2m0w0h0d0",
    color: "white",
    material: "eco-leather",
    width: 52,
    height: 91,
    depth: 38,
    weight: 4,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10202-1-c0m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 60,
    height: 90,
    depth: 60,
    weight: 8,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10202-2-c0m0w0h0d0",
    color: "white",
    material: "plastic",
    width: 36,
    height: 46,
    depth: 26,
    weight: 1,
    folding: false,
    warranty: 14,
  },
  {
    vendor_code: "10202-3-c0m0w0h0d0",
    color: "black",
    material: "tempered_glass",
    width: 120,
    height: 75,
    depth: 70,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10202-3-c1m0w0h0d0",
    color: "white",
    material: "tempered_glass",
    width: 120,
    height: 75,
    depth: 70,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10202-4-c0m0w0h0d0",
    color: "brown",
    material: "epoxy_resin",
    width: 60,
    height: 44,
    depth: 56,
    weight: 5,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10202-5-c0m0w0h0d0",
    color: "brown",
    material: "wood",
    width: 110,
    height: 77,
    depth: 60,
    weight: 14,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10202-6-c0m0w0h0d0",
    color: "black",
    material: "tempered_glass",
    width: 100,
    height: 77,
    depth: 100,
    weight: 40,
    folding: true,
    warranty: 12,
  },
  {
    vendor_code: "10202-7-c0m0w0h0d0",
    color: "brown",
    material: "wood",
    width: 84,
    height: 58,
    depth: 54,
    weight: 10,
    folding: false,
    warranty: 2,
  },
  {
    vendor_code: "10202-7-c1m0w0h0d0",
    color: "beige",
    material: "wood",
    width: 84,
    height: 58,
    depth: 54,
    weight: 10,
    folding: false,
    warranty: 2,
  },
  {
    vendor_code: "10202-7-c2m0w0h0d0",
    color: "light-beige",
    material: "wood",
    width: 84,
    height: 58,
    depth: 54,
    weight: 10,
    folding: false,
    warranty: 2,
  },
  {
    vendor_code: "10202-8-c0m0w0h0d0",
    color: "white",
    material: "glass",
    width: 90,
    height: 76,
    depth: 90,
    weight: 16,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10202-8-c1m0w0h0d0",
    color: "beige",
    material: "glass",
    width: 90,
    height: 76,
    depth: 90,
    weight: 16,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10202-9-c0m0w0h0d0",
    color: "white",
    material: "LDP",
    width: 60,
    height: 74,
    depth: 140,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10202-9-c0m0w0h0d1",
    color: "white",
    material: "LDP",
    width: 60,
    height: 74,
    depth: 100,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10202-9-c0m0w0h0d2",
    color: "white",
    material: "LDP",
    width: 60,
    height: 74,
    depth: 120,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10202-10-c0m0w0h0d0",
    color: "brown",
    material: "LDP",
    width: 90,
    height: 75,
    depth: 54,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10202-10-c1m0w0h0d0",
    color: "light-beige",
    material: "LDP",
    width: 90,
    height: 75,
    depth: 54,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10202-10-c2m0w0h0d0",
    color: "white",
    material: "LDP",
    width: 90,
    height: 75,
    depth: 54,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10202-10-c3m0w0h0d0",
    color: "light-brown",
    material: "LDP",
    width: 90,
    height: 75,
    depth: 54,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10202-11-c0m0w0h0d0",
    color: "white",
    material: "plastic",
    width: 122,
    height: 74,
    depth: 60,
    weight: 10,
    folding: true,
    warranty: 12,
  },

  {
    vendor_code: "10203-1-c0m0w0h0d0",
    color: "beige",
    material: "eco-leather",
    width: 32,
    height: 46,
    depth: 32,
    weight: 1,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10203-1-c1m0w0h0d0",
    color: "gray",
    material: "eco-leather",
    width: 32,
    height: 46,
    depth: 32,
    weight: 1,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10203-2-c0m0w0h0d0",
    color: "light-brown",
    material: "wood",
    width: 34,
    height: 42,
    depth: 34,
    weight: 2,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10203-3-c0m0w0h0d0",
    color: "beige",
    material: "wood",
    width: 33,
    height: 45,
    depth: 33,
    weight: 2,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10203-3-c1m0w0h0d0",
    color: "white",
    material: "wood",
    width: 33,
    height: 45,
    depth: 33,
    weight: 2,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10203-3-c2m0w0h0d0",
    color: "brown",
    material: "wood",
    width: 33,
    height: 45,
    depth: 33,
    weight: 2,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10203-4-c0m0w0h0d0",
    color: "light-beige",
    material: "wood",
    width: 33,
    height: 45,
    depth: 33,
    weight: 2,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10203-4-c1m0w0h0d0",
    color: "beige",
    material: "wood",
    width: 33,
    height: 45,
    depth: 33,
    weight: 2,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10203-4-c2m0w0h0d0",
    color: "black",
    material: "wood",
    width: 33,
    height: 45,
    depth: 33,
    weight: 2,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10203-5-c0m0w0h0d0",
    color: "beige",
    material: "eco-leather",
    width: 37,
    height: 46,
    depth: 37,
    weight: 2,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10203-5-c1m0w0h0d0",
    color: "light-beige",
    material: "eco-leather",
    width: 37,
    height: 46,
    depth: 37,
    weight: 2,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10203-5-c2m0w0h0d0",
    color: "black",
    material: "eco-leather",
    width: 37,
    height: 46,
    depth: 37,
    weight: 2,
    folding: false,
    warranty: 12,
  },

  {
    vendor_code: "10301-1-c0m0w0h0d0",
    color: "beige",
    material: "eco-leather",
    width: 47,
    height: 45,
    depth: 47,
    weight: 13,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10301-2-c0m0w0h0d0",
    color: "white",
    material: "eco-leather",
    width: 48,
    height: 45,
    depth: 46,
    weight: 11,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10301-2-c1m0w0h0d0",
    color: "black",
    material: "eco-leather",
    width: 48,
    height: 45,
    depth: 46,
    weight: 11,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10301-2-c2m0w0h0d0",
    color: "pink",
    material: "eco-leather",
    width: 48,
    height: 45,
    depth: 46,
    weight: 11,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10301-3-c0m0w0h0d0",
    color: "black",
    material: "eco-leather",
    width: 48,
    height: 75,
    depth: 48,
    weight: 30,
    folding: false,
    warranty: 36,
  },
  {
    vendor_code: "10301-4-c0m0w0h0d0",
    color: "light-beige",
    material: "wood",
    width: 33,
    height: 45,
    depth: 33,
    weight: 2,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10301-4-c1m0w0h0d0",
    color: "blue",
    material: "micro_velvet",
    width: 70,
    height: 136,
    depth: 117,
    weight: 20,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10301-4-c2m0w0h0d0",
    color: "brown",
    material: "micro_velvet",
    width: 70,
    height: 136,
    depth: 117,
    weight: 20,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10301-5-c0m0w0h0d0",
    color: "beige",
    material: "eco-leather",
    width: 50,
    height: 131,
    depth: 51,
    weight: 26,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10301-6-c0m0w0h0d0",
    color: "black",
    material: "plastic",
    width: 66,
    height: 91,
    depth: 48,
    weight: 21,
    folding: false,
    warranty: 12,
  },

  {
    vendor_code: "10302-1-c0m0w0h0d0",
    color: "light-beige",
    material: "MDF",
    width: 116,
    height: 165,
    depth: 60,
    weight: 62,
    folding: false,
    warranty: 36,
  },
  {
    vendor_code: "10302-1-c1m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 116,
    height: 165,
    depth: 60,
    weight: 62,
    folding: false,
    warranty: 36,
  },
  {
    vendor_code: "10302-2-c0m0w0h0d0",
    color: "beige",
    material: "MDF",
    width: 110,
    height: 75,
    depth: 72,
    weight: 21,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10302-2-c1m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 110,
    height: 75,
    depth: 72,
    weight: 21,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10302-2-c2m0w0h0d0",
    color: "black",
    material: "MDF",
    width: 110,
    height: 75,
    depth: 72,
    weight: 21,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10302-3-c0m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 108,
    height: 75,
    depth: 55,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10302-3-c1m0w0h0d0",
    color: "gray",
    material: "MDF",
    width: 108,
    height: 75,
    depth: 55,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10302-4-c0m0w0h0d0",
    color: "light-beige",
    material: "MDF",
    width: 106,
    height: 75,
    depth: 45,
    weight: 22,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10302-4-c1m0w0h0d0",
    color: "black",
    material: "MDF",
    width: 106,
    height: 75,
    depth: 45,
    weight: 22,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10302-4-c2m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 106,
    height: 75,
    depth: 45,
    weight: 22,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10302-5-c0m0w0h0d0",
    color: "light-beige",
    material: "MDF",
    width: 110,
    height: 75,
    depth: 49,
    weight: 23,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10302-5-c1m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 110,
    height: 75,
    depth: 49,
    weight: 23,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10302-6-c0m0w0h0d0",
    color: "black",
    material: "MDF",
    width: 120,
    height: 115,
    depth: 60,
    weight: 20,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10302-6-c0m0w0h0d0",
    color: "brown",
    material: "MDF",
    width: 120,
    height: 115,
    depth: 60,
    weight: 20,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10302-6-c0m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 120,
    height: 115,
    depth: 60,
    weight: 20,
    folding: false,
    warranty: 12,
  },

  {
    vendor_code: "10303-1-c0m0w0h0d0",
    color: "black",
    material: "eco-leather",
    width: 57,
    height: 99,
    depth: 53,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10303-1-c1m0w0h0d0",
    color: "beige",
    material: "eco-leather",
    width: 57,
    height: 99,
    depth: 53,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10303-2-c0m0w0h0d0",
    color: "black",
    material: "eco-leather",
    width: 45,
    height: 66,
    depth: 25,
    weight: 5,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10303-3-c0m0w0h0d0",
    color: "black",
    material: "eco-leather",
    width: 60,
    height: 35,
    depth: 35,
    weight: 8,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10303-3-c1m0w0h0d0",
    color: "white",
    material: "eco-leather",
    width: 60,
    height: 35,
    depth: 35,
    weight: 8,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10303-4-c0m0w0h0d0",
    color: "gray",
    material: "plastic",
    width: 62,
    height: 138,
    depth: 78,
    weight: 15,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10303-5-c0m0w0h0d0",
    color: "light-beige",
    material: "eco-leather",
    width: 45,
    height: 66,
    depth: 25,
    weight: 8,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10303-6-c0m0w0h0d0",
    color: "orange",
    material: "eco-leather",
    width: 45,
    height: 66,
    depth: 25,
    weight: 8,
    folding: false,
    warranty: 12,
  },

  {
    vendor_code: "10401-1-c0m0w0h0d0",
    color: "gray",
    material: "MDF",
    width: 270,
    height: 240,
    depth: 58,
    weight: 175,
    folding: false,
    warranty: 18,
  },
  {
    vendor_code: "10401-1-c1m0w0h0d0",
    color: "beige",
    material: "MDF",
    width: 270,
    height: 240,
    depth: 58,
    weight: 175,
    folding: false,
    warranty: 18,
  },
  {
    vendor_code: "10401-1-c2m0w0h0d0",
    color: "brown",
    material: "MDF",
    width: 270,
    height: 240,
    depth: 58,
    weight: 175,
    folding: false,
    warranty: 18,
  },
  {
    vendor_code: "10401-2-c0m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 160,
    height: 210,
    depth: 50,
    weight: 145,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10401-3-c0m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 80,
    height: 210,
    depth: 51,
    weight: 73,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10401-3-c1m0w0h0d0",
    color: "dark-beige",
    material: "MDF",
    width: 80,
    height: 210,
    depth: 51,
    weight: 73,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10401-4-c0m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 90,
    height: 200,
    depth: 50,
    weight: 81,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10401-4-c1m0w0h0d0",
    color: "gray",
    material: "MDF",
    width: 90,
    height: 200,
    depth: 50,
    weight: 81,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10401-5-c0m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 100,
    height: 30,
    depth: 26,
    weight: 11,
    folding: false,
    warranty: 24,
  },

  {
    vendor_code: "10402-1-c0m0w0h0d0",
    color: "black",
    material: "MDF",
    width: 120,
    height: 90,
    depth: 40,
    weight: 43,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10402-1-c1m0w0h0d0",
    color: "gray",
    material: "MDF",
    width: 120,
    height: 90,
    depth: 40,
    weight: 43,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10402-1-c1m0w0h0d0",
    color: "dark-gray",
    material: "MDF",
    width: 120,
    height: 90,
    depth: 40,
    weight: 43,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10402-2-c0m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 80,
    height: 80,
    depth: 45,
    weight: 18,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10402-3-c0m0w0h0d0",
    color: "beige",
    material: "MDF",
    width: 75,
    height: 73,
    depth: 32,
    weight: 24,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10402-4-c0m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 70,
    height: 85,
    depth: 35,
    weight: 24,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10402-5-c0m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 75,
    height: 72,
    depth: 33,
    weight: 24,
    folding: false,
    warranty: 24,
  },

  {
    vendor_code: "10403-1-c0m0w0h0d0",
    color: "turquoise",
    material: "MDF",
    width: 46,
    height: 46,
    depth: 40,
    weight: 19,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10403-1-c1m0w0h0d0",
    color: "black",
    material: "MDF",
    width: 46,
    height: 46,
    depth: 40,
    weight: 19,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10403-1-c1m0w0h0d0",
    color: "light-beige",
    material: "MDF",
    width: 46,
    height: 46,
    depth: 40,
    weight: 19,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10403-2-c0m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 40,
    height: 41,
    depth: 37,
    weight: 12,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10403-3-c0m0w0h0d0",
    color: "dark-gray",
    material: "MDF",
    width: 70,
    height: 38,
    depth: 30,
    weight: 13,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10403-3-c1m0w0h0d0",
    color: "white",
    material: "MDF",
    width: 70,
    height: 38,
    depth: 30,
    weight: 13,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10403-3-c2m0w0h0d0",
    color: "brown",
    material: "MDF",
    width: 70,
    height: 38,
    depth: 30,
    weight: 13,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10403-4-c0m0w0h0d0",
    color: "black",
    material: "metal",
    width: 38,
    height: 55,
    depth: 28,
    weight: 5,
    folding: false,
    warranty: 12,
  },
  {
    vendor_code: "10403-5-c0m0w0h0d0",
    color: "light-beige",
    material: "MDF",
    width: 40,
    height: 32,
    depth: 36,
    weight: 10,
    folding: false,
    warranty: 12,
  },

  {
    vendor_code: "10501-1-c0m0w0h0d0",
    color: "light-gray",
    material: "metal",
    width: 110,
    height: 151,
    depth: 50,
    weight: 19,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10501-1-c1m0w0h0d0",
    color: "black",
    material: "metal",
    width: 110,
    height: 151,
    depth: 50,
    weight: 5,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10501-2-c0m0w0h0d0",
    color: "white",
    material: "metal",
    width: 110,
    height: 150,
    depth: 140,
    weight: 5,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10501-2-c1m0w0h0d0",
    color: "black",
    material: "metal",
    width: 110,
    height: 150,
    depth: 140,
    weight: 5,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10501-3-c0m0w0h0d0",
    color: "black",
    material: "metal",
    width: 48,
    height: 170,
    depth: 48,
    weight: 5,
    folding: false,
    warranty: 6,
  },

  {
    vendor_code: "10502-1-c0m0w0h0d0",
    color: "black",
    material: "plastic",
    width: 40,
    height: 42,
    depth: 19,
    weight: 1,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10502-2-c0m0w0h0d0",
    color: "black",
    material: "metal",
    width: 44,
    height: 21,
    depth: 25,
    weight: 1,
    folding: false,
    warranty: 6,
  },
  {
    vendor_code: "10502-3-c0m0w0h0d0",
    color: "black",
    material: "metal",
    width: 65,
    height: 52,
    depth: 28,
    weight: 2,
    folding: false,
    warranty: 24,
  },
  {
    vendor_code: "10502-4-c0m0w0h0d0",
    color: "black",
    material: "metal",
    width: 66,
    height: 70,
    depth: 28,
    weight: 3,
    folding: false,
    warranty: 6,
  },
] satisfies CharacteristicsSpecified[]
