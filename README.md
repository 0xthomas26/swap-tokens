# Swap Tokens

### Installation

`yarn install`

### Run

`yarn start`

### Test

`yarn test`

---

The function `createExchangeGraphFromFile` builds an exchange rate graph from the file.

The function `swapTokens` takes the exchangeRates & a query (from, to, amount) then performs a breadth-first search. It returns an amount with 6 decimal places and the path:

36 (TokenA -> TokenB -> TokenC)
8333.333333 (TokenB -> TokenA)
24000000000 (TokenD -> TokenA -> TokenB)
1.388889 (TokenC -> TokenB -> TokenA -> TokenD)

---

Note that this implementation assumes that all token pairs are connected (i.e. there is a path from any token to any other token). If this is not the case, the function may return incorrect results or get stuck in an infinite loop.
