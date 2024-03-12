import { db } from "@/app/db"
import { exchange_rates_USD } from "@/app/db/schema"

type ExchangeRates = {
  meta: {
    last_updated_at: string
  }
  data: {
    EUR: {
      code: string
      value: number
    }
    MDL: {
      code: string
      value: number
    }
  }
}

export default async function getCurrencyConversion() {
  // const currentDate = new Date(Date.now()).toISOString().slice(0, 9)

  const exchangeRatesUSDArr = await db.select().from(exchange_rates_USD)
  // .where(like(exchange_rates_USD.date, `${currentDate}%`))

  const exchangeRatesUSD = exchangeRatesUSDArr[0]

  // if (!exchangeRatesUSD) {
  //   const response = await fetch(
  //     `https://api.currencyapi.com/v3/latest?apikey=${process.env.CURRENCY_API_KEY}&base_currency=USD&currencies=EUR%2CMDL`,
  //     {
  //       method: "GET",
  //     }
  //   )
  //   const result = (await response.json()) as ExchangeRates

  //   await db
  //     .insert(exchange_rates_USD)
  //     .values({
  //       id: 1,
  //       EUR: result.data.EUR.value,
  //       MDL: result.data.MDL.value,
  //       date: result.meta.last_updated_at.slice(0, 10),
  //     })
  //     .onDuplicateKeyUpdate({
  //       set: { id: sql`id` },
  //     })
  //     .execute()

  //   return {
  //     EUR: result.data.EUR.value,
  //     MDL: result.data.MDL.value,
  //   } as Rates
  // } else {
  // }
  return {
    EUR: exchangeRatesUSD.EUR,
    MDL: exchangeRatesUSD.MDL,
  } as Rates
}
