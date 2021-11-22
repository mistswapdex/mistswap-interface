import {
  dayDatasQuery,
  ethPriceQuery,
  factoryQuery,
  liquidityPositionsQuery,
  pairsQuery,
  tokenDayDatasQuery,
  tokenPairsQuery,
  tokenPriceQuery,
  tokenQuery,
  tokenSubsetQuery,
  tokensQuery,
  transactionsQuery,
} from '../queries'

import { ChainId } from '@mistswapdex/sdk'
import { GRAPH_HOST } from '../constants'
import { pager } from './'

export const EXCHANGE = {
  [ChainId.SMARTBCH]: 'mistswap/exchange',
}

export const exchange = async (chainId = ChainId.SMARTBCH, query, variables = {}) =>
  pager(`${GRAPH_HOST[chainId]}/subgraphs/name/${EXCHANGE[chainId]}`, query, variables)

export const getPairs = async (chainId = ChainId.SMARTBCH, variables = undefined, query = pairsQuery) => {
  const { pairs } = await exchange(chainId, query, variables)
  return pairs
}

export const getTokenSubset = async (chainId = ChainId.SMARTBCH, variables) => {
  // console.log('getTokenSubset')
  const { tokens } = await exchange(chainId, tokenSubsetQuery, variables)
  return tokens
}

export const getTokens = async (chainId = ChainId.SMARTBCH, variables) => {
  // console.log('getTokens')
  const { tokens } = await exchange(chainId, tokensQuery, variables)
  return tokens
}

export const getToken = async (chainId = ChainId.SMARTBCH, query = tokenQuery, variables) => {
  // console.log('getTokens')
  const { token } = await exchange(chainId, query, variables)
  return token
}

export const getTokenDayData = async (chainId = ChainId.SMARTBCH, variables) => {
  // console.log('getTokens')
  const { tokenDayDatas } = await exchange(chainId, tokenDayDatasQuery, variables)
  return tokenDayDatas
}

export const getTokenPrices = async (chainId = ChainId.SMARTBCH, variables) => {
  // console.log('getTokenPrice')
  const { tokens } = await exchange(chainId, tokensQuery, variables)
  return tokens.map((token) => token?.derivedETH)
}

export const getTokenPrice = async (chainId = ChainId.SMARTBCH, query, variables) => {
  // console.log('getTokenPrice')
  const nativePrice = await getNativePrice(chainId)

  const { token } = await exchange(chainId, query, variables)
  return token?.derivedETH * nativePrice
}

export const getNativePrice = async (chainId = ChainId.SMARTBCH, variables = undefined) => {
  // console.log('getEthPrice')
  const data = await getBundle(chainId, undefined, variables)
  return data?.bundles[0]?.ethPrice
}

export const getEthPrice = async (variables = undefined) => {
  return getNativePrice(ChainId.SMARTBCH, variables)
}

export const getYggPrice = async (variables = {}) => {
  return getTokenPrice(ChainId.SMARTBCH, tokenPriceQuery, {
    id: '0x25f8087ead173b73d6e8b84329989a8eea16cf73',
    ...variables,
  })
}

export const getRulerPrice = async (variables = {}) => {
  return getTokenPrice(ChainId.SMARTBCH, tokenPriceQuery, {
    id: '0x2aeccb42482cc64e087b6d2e5da39f5a7a7001f8',
    ...variables,
  })
}

export const getTruPrice = async (variables = {}) => {
  return getTokenPrice(ChainId.SMARTBCH, tokenPriceQuery, {
    id: '0x4c19596f5aaff459fa38b0f7ed92f11ae6543784',
    ...variables,
  })
}

export const getCvxPrice = async (variables = {}) => {
  return getTokenPrice(ChainId.SMARTBCH, tokenPriceQuery, {
    id: '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
    ...variables,
  })
}

export const getMaticPrice = async (variables = {}) => {
  console.log('getMaticPrice')
  // return getTokenPrice(ChainId.MATIC, tokenPriceQuery, {
  //   id: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  //   ...variables,
  // })
}

export const getAlcxPrice = async (variables = {}) => {
  // console.log('getAlcxPrice')
  return getTokenPrice(ChainId.SMARTBCH, tokenPriceQuery, {
    id: '0xdbdb4d16eda451d0503b854cf79d55697f90c8df',
    ...variables,
  })
}

export const getPicklePrice = async (variables = {}) => {
  return getTokenPrice(ChainId.SMARTBCH, tokenPriceQuery, {
    id: '0x429881672b9ae42b8eba0e26cd9c73711b891ca5',
    ...variables,
  })
}

export const getMphPrice = async (variables = {}) => {
  return getTokenPrice(ChainId.SMARTBCH, tokenPriceQuery, {
    id: '0x8888801af4d980682e47f1a9036e589479e835c5',
    ...variables,
  })
}

export const getSushiPrice = async (variables = {}) => {
  console.log('getSushiPrice', tokenPriceQuery, variables)
  return getTokenPrice(ChainId.SMARTBCH, tokenPriceQuery, {
    id: '0x5fa664f69c2a4a3ec94fac3cbf7049bd9ca73129',
    ...variables,
  })
}

export const getStakePrice = async (variables = {}) => {
  // return getTokenPrice(ChainId.XDAI, tokenPriceQuery, {
  //   id: '0xb7d311e2eb55f2f68a9440da38e7989210b9a05e',
  //   ...variables,
  // })
}

export const getOnePrice = async (variables = undefined) => {
  // return getNativePrice(ChainId.HARMONY, variables)
}

export const getAvaxPrice = async (variables = undefined) => {
  // return getNativePrice(ChainId.AVALANCHE, variables)
}

export const getBundle = async (
  chainId = ChainId.SMARTBCH,
  query = ethPriceQuery,
  variables = {
    id: 1,
  }
) => {
  return exchange(chainId, query, variables)
}

export const getLiquidityPositions = async (chainId = ChainId.SMARTBCH, variables) => {
  const { liquidityPositions } = await exchange(chainId, liquidityPositionsQuery, variables)
  return liquidityPositions
}

export const getDayData = async (chainId = ChainId.SMARTBCH, variables = undefined) => {
  const { dayDatas } = await exchange(chainId, dayDatasQuery, variables)
  return dayDatas
}

export const getFactory = async (chainId = ChainId.SMARTBCH, variables = undefined) => {
  const { factories } = await exchange(chainId, factoryQuery, variables)
  return factories[0]
}

export const getTransactions = async (chainId = ChainId.SMARTBCH, variables = undefined) => {
  const { swaps } = await exchange(chainId, transactionsQuery, variables)
  return swaps
}

export const getTokenPairs = async (chainId = ChainId.SMARTBCH, variables = undefined) => {
  const { pairs0, pairs1 } = await exchange(chainId, tokenPairsQuery, variables)
  return pairs0 || pairs1 ? [...(pairs0 ? pairs0 : []), ...(pairs1 ? pairs1 : [])] : undefined
}
