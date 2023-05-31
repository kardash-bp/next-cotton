import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";


export function useTotal(price: string, qty: number, cb: (x: string, y: number) => number) {
  let total = 0
  useEffect(() => {
    cb(price, qty)
  })
  return total
}