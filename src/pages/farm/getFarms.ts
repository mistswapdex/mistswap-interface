import { MASTERCHEF_ADDRESS, Token, WBCH } from '@mistswapdex/sdk';
import { FLEXUSD, MIST } from '../../config/tokens';
import { Chef, PairType } from '../../features/onsen/enum';
import { usePendingSushi, usePositions } from '../../features/onsen/hooks';
import {
  useAverageBlockTime,
  useEthPrice,
  useFarmPairAddresses,
  useFarms,
  useMasterChefV1HealthCheck,
  useMasterChefV1SushiPerBlock,
  useMasterChefV1TotalAllocPoint,
  useSushiPairs,
  useSushiPrice,
} from '../../services/graph'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks';
import { useHardcodedFarms } from './hardcodedFarms';
import { getAddress } from '@ethersproject/address'

export function useGetFarms(chainId, filter) {
  const graphAvailable = useMasterChefV1HealthCheck()
  let farms = []
  let [mistPriceUSD, bchPriceUSD] = [0., 0.]
  let pairAddresses;
  let swapPairs;
  let kashiPairs = [] // unused
  let averageBlockTime = 0.;
  let masterChefV1TotalAllocPoint = 0;
  let masterChefV1SushiPerBlock = 0;
  const positions = usePositions(chainId)

  if (graphAvailable) {
    pairAddresses = useFarmPairAddresses()
    swapPairs = useSushiPairs({ subset: pairAddresses, shouldFetch: !!pairAddresses })

    farms = useFarms()
    // farms.forEach(val => {
    //   val.id = Number(val.id)
    //   val.chef = Number(val.chef)

    //   val.pendingSushi = usePendingSushi(val)
    //   val.pending = Number.parseFloat(val.pendingSushi?.toFixed())
    // })
    farms = farms.sort((a, b) => b.allocPoint - a.allocPoint);

    [mistPriceUSD, bchPriceUSD] = [
      useSushiPrice(),
      useEthPrice(),
    ]

    averageBlockTime = useAverageBlockTime()
    masterChefV1SushiPerBlock = useMasterChefV1SushiPerBlock()
    masterChefV1TotalAllocPoint = useMasterChefV1TotalAllocPoint()
  } else {
    [farms, swapPairs] = useHardcodedFarms(chainId)

    const flexUSDMistPool = farms.find((v) => v.pair === '0x437E444365aD9ed788e8f255c908bceAd5AEA645').pool;
    const bchFlexUSDPool = farms.find((v) => v.pair === '0x24f011f12Ea45AfaDb1D4245bA15dCAB38B43D13').pool;
    if (bchFlexUSDPool.reserves) {
      bchPriceUSD = Number.parseFloat(bchFlexUSDPool.reserves[1].toFixed()) / Number.parseFloat(bchFlexUSDPool.reserves[0].toFixed());
    }
    if (flexUSDMistPool.reserves) {
      mistPriceUSD = 1. / ( Number.parseFloat(flexUSDMistPool.reserves[0].toFixed()) / Number.parseFloat(flexUSDMistPool.reserves[1].toFixed()))
    }

    averageBlockTime = 5.5
    masterChefV1SushiPerBlock = 10
  }

  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    MASTERCHEF_ADDRESS[chainId],
    farms.map((farm) => new Token(chainId, farm.pair, 18, 'LP', 'LP Token')),
  )

  if (! fetchingV2PairBalances) {
    for (let i=0; i<farms.length; ++i) {
      if (v2PairsBalances.hasOwnProperty(farms[i].pair) && farms[i].pool.totalSupply) {
        const totalSupply = Number.parseFloat(farms[i].pool.totalSupply.toFixed());
        const chefBalance = Number.parseFloat(v2PairsBalances[farms[i].pair].toFixed());

        let tvl = 0;
        if (farms[i].pool.token0 === MIST[chainId].address) {
          const reserve = Number.parseFloat(farms[i].pool.reserves[0].toFixed());
          tvl = reserve / totalSupply * chefBalance * mistPriceUSD * 2;
        }
        else if (farms[i].pool.token1 === MIST[chainId].address) {
          const reserve = Number.parseFloat(farms[i].pool.reserves[1].toFixed());
          tvl = reserve / totalSupply * chefBalance * mistPriceUSD * 2;
        }
        else if (farms[i].pool.token0 === FLEXUSD.address) {
          const reserve = Number.parseFloat(farms[i].pool.reserves[0].toFixed());
          tvl = reserve / totalSupply * chefBalance * 2;
        }
        else if (farms[i].pool.token1 === FLEXUSD.address) {
          const reserve = Number.parseFloat(farms[i].pool.reserves[1].toFixed());
          tvl = reserve / totalSupply * chefBalance * 2;
        }
        else if (farms[i].pool.token0 === WBCH[chainId].address) {
          const reserve = Number.parseFloat(farms[i].pool.reserves[0].toFixed());
          tvl = reserve / totalSupply * chefBalance * bchPriceUSD * 2;
        }
        else if (farms[i].pool.token1 === WBCH[chainId].address) {
          const reserve = Number.parseFloat(farms[i].pool.reserves[1].toFixed());
          tvl = reserve / totalSupply * chefBalance * bchPriceUSD * 2;
        }
        farms[i].tvl = tvl;
        farms[i].chefBalance = chefBalance;
      } else {
        farms[i].tvl = "0";
        farms[i].chefBalance = 0;
      }
    }
  }

  const blocksPerDay = 86400 / Number(averageBlockTime)

  const map = (pool) => {
    // TODO: Account for fees generated in case of swap pairs, and use standard compounding
    // algorithm with the same intervals acrosss chains to account for consistency.
    // For lending pairs, what should the equivilent for fees generated? Interest gained?
    // How can we include this?
    // TODO: Deal with inconsistencies between properties on subgraph
    pool.owner = pool?.owner || pool?.masterChef
    pool.balance = pool?.balance || pool?.slpBalance
    const swapPair = swapPairs?.find((pair) => pair.id === pool.pair)
    const kashiPair = kashiPairs?.find((pair) => pair.id === pool.pair)
    const type = swapPair ? PairType.SWAP : PairType.KASHI
    const pair = swapPair || kashiPair
    const blocksPerHour = 3600 / averageBlockTime
    function getRewards() {
      // TODO: Some subgraphs give sushiPerBlock & sushiPerSecond, and mcv2 gives nothing
      const sushiPerBlock =
        pool?.owner?.sushiPerBlock / 1e18 ||
        (pool?.owner?.sushiPerSecond / 1e18) * averageBlockTime ||
        masterChefV1SushiPerBlock
      const rewardPerBlock = (pool.allocPoint / pool.owner.totalAllocPoint) * sushiPerBlock
      const defaultReward = {
        token: 'MIST',
        icon: 'https://raw.githubusercontent.com/mistswapdex/assets/master/blockchains/smartbch/assets/0x5fA664f69c2A4A3ec94FaC3cBf7049BD9CA73129/logo.png',
        rewardPerBlock,
        rewardPerDay: rewardPerBlock * blocksPerDay,
        rewardPrice: mistPriceUSD,
      }
      const defaultRewards = [defaultReward]
      if (pool.chef === Chef.MASTERCHEF_V2) {
        // override for mcv2...
        pool.owner.totalAllocPoint = masterChefV1TotalAllocPoint
        const icon = ['0', '3', '4', '8'].includes(pool.id)
          ? `https://raw.githubusercontent.com/mistswapdex/icons/master/token/${pool.rewardToken.symbol.toLowerCase()}.jpg`
          : `https://raw.githubusercontent.com/mistswapdex/assets/master/blockchains/smartbch/assets/${getAddress(
              pool.rewarder.rewardToken
            )}/logo.png`
        const decimals = 10 ** pool.rewardToken.decimals
        const rewardPerBlock = (pool.rewarder.rewardPerSecond / decimals) * averageBlockTime
        const rewardPerDay = (pool.rewarder.rewardPerSecond / decimals) * averageBlockTime * blocksPerDay
        const reward = {
          token: pool.rewardToken.symbol,
          icon: icon,
          rewardPerBlock: rewardPerBlock,
          rewardPerDay: rewardPerDay,
          rewardPrice: pool.rewardToken.derivedETH * bchPriceUSD,
        }
        return [...defaultRewards, reward]
      }
      return defaultRewards
    }
    const rewards = getRewards()
    const balance = swapPair ? Number(pool.balance / 1e18) : pool.balance / 10 ** kashiPair.token0.decimals
    let tvl = pool.tvl
    if (Number(tvl) === 0)
    {
      tvl = swapPair
      ? (balance / Number(swapPair.totalSupply)) * Number(swapPair.reserveUSD)
      : balance * kashiPair.token0.derivedETH * bchPriceUSD
    }
    const roiPerBlock =
      rewards.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.rewardPerBlock * currentValue.rewardPrice
      }, 0) / tvl
    const roiPerHour = roiPerBlock * blocksPerHour
    const roiPerDay = roiPerHour * 24
    const roiPerMonth = roiPerDay * 30
    const roiPerYear = roiPerMonth * 12
    const position = positions.find((position) => position.id === pool.id && position.chef === pool.chef)
    return {
      ...pool,
      ...position,
      pair: {
        ...pair,
        decimals: pair.type === PairType.KASHI ? Number(pair.asset.tokenInfo.decimals) : 18,
        type,
      },
      balance,
      roiPerBlock,
      roiPerHour,
      roiPerDay,
      roiPerMonth,
      roiPerYear,
      rewards,
      tvl,
    }
  }

  const FILTER = {
    all: (farm) => Number(farm.allocPoint) !== 0,
    portfolio: (farm) => Number(farm.pending) !== 0,
    past: (farm) => Number(farm.allocPoint) === 0,
    // sushi: (farm) => farm.pair.type === PairType.SWAP && farm.allocPoint !== '0',
    // kashi: (farm) => farm.pair.type === PairType.KASHI && farm.allocPoint !== '0',
    // '2x': (farm) => (farm.chef === Chef.MASTERCHEF_V2) && farm.allocPoint !== '0',
  }

  return farms
    .filter((farm) => {
      return (
        (swapPairs && swapPairs.find((pair) => pair.id === farm.pair)) ||
        (kashiPairs && kashiPairs.find((pair) => pair.id === farm.pair))
      )
    })
    .map(map)
    .filter((farm) => {
      return filter in FILTER ? FILTER[filter](farm) : true
    })
}