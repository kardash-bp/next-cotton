import { TOTAL_COUNT_PRODUCTS } from "../components/Pagination"
import { PER_PAGE } from "../config"

export const paginationField = () => {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }: { args: any, cache: any }) {
      const { skip, first } = args

      const data = cache.readQuery({ query: TOTAL_COUNT_PRODUCTS })
      const total = (data?.productsConnection?.aggregate.count);
      const page = skip / first + 1
      const pages = Math.ceil(total / PER_PAGE)
      const items = existing.slice(skip, skip + first).filter(x => x)
      if (items.length !== first) {
        return false
      }
      if (page === pages && items?.length !== first) {
        return items
      }
      if (items.length) {
        console.log(`There are ${items.length} items in the cache. Return them`)
        return items
      }
      return false

    },
    merge(existing: any, incoming: any, { args }: { args: any }) {
      const { skip, first } = args
      const merged = existing ? existing.slice(0) : []
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip]
      }
      return merged
    }
  }
}