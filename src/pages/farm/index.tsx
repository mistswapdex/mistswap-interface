import { Chef, PairType } from '../../features/onsen/enum'
import { useActiveWeb3React, useFuse } from '../../hooks'
import {
  useAverageBlockTime,
  useEthPrice,
  useFarmPairAddresses,
  useFarms,
  useMasterChefV1SushiPerBlock,
  useMasterChefV1TotalAllocPoint,
  useSushiPairs,
  useSushiPrice,
} from '../../services/graph'

import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, WNATIVE, Token, WBCH, MASTERCHEF_ADDRESS } from '@mistswapdex/sdk'
import { MIST, FLEXUSD } from '../../config/tokens'
import Container from '../../components/Container'
import FarmList from '../../features/onsen/FarmList'
import Head from 'next/head'
import Menu from '../../features/onsen/FarmMenu'
import React from 'react'
import Search from '../../components/Search'
import { classNames } from '../../functions'
import dynamic from 'next/dynamic'
import { getAddress } from '@ethersproject/address'
import useFarmRewards from '../../hooks/useFarmRewards'
import usePool from '../../hooks/usePool'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePositions, usePendingSushi } from '../../features/onsen/hooks'
import { useRouter } from 'next/router'

export default function Farm(): JSX.Element {
  const { chainId } = useActiveWeb3React()
  const router = useRouter()

  const type = router.query.filter == null ? 'all' : (router.query.filter as string)

  const hardcodedPairs = {
    [ChainId.SMARTBCH]: {
      "0x674A71E69fe8D5cCff6fdcF9F1Fa4262Aa14b154": {
        farmId: 7,
        allocPoint: 361916384,
        token0: MIST[ChainId.SMARTBCH],
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0x437E444365aD9ed788e8f255c908bceAd5AEA645": {
        farmId: 8,
        allocPoint: 86288234,
        token0: MIST[ChainId.SMARTBCH],
        token1: FLEXUSD,
      },
      "0x80F712670d268cf2C05e7162674c7466c940eBE3": {
        farmId: 0,
        allocPoint: 213339573,
        token0: new Token(ChainId.SMARTBCH, '0x77CB87b57F54667978Eb1B199b28a0db8C8E1c0B', 18, 'EBEN', 'Green Ben'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0x24f011f12Ea45AfaDb1D4245bA15dCAB38B43D13": {
        farmId: 1,
        allocPoint: 219428219,
        token0: FLEXUSD,
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0x4fF52e9D7824EC9b4e0189F11B5aA0F02b459b03": {
        farmId: 2,
        allocPoint: 10438301,
        token0: new Token(ChainId.SMARTBCH, '0x98Dd7eC28FB43b3C4c770AE532417015fa939Dd3', 18, 'FLEX', 'FLEX Coin'),
        token1: FLEXUSD,
      },
      "0x1EE39F93450d80981c169E59C8A641a3bC853A09": {
        farmId: 3,
        allocPoint: 7452498,
        token0: new Token(ChainId.SMARTBCH, '0xff3ed63bf8bc9303ea0a7e1215ba2f82d569799e', 18, 'ORB', 'ORB'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0xc98552Ad7DFC5daabAd2660DF378e0070ca75Efc": {
        farmId: 4,
        allocPoint: 11337587,
        token0: new Token(ChainId.SMARTBCH, '0xc70c7718C7f1CCd906534C2c4a76914173EC2c44', 18, 'KTH', 'Knuth'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0x287a276401caDBe50d5C0398137490E6d45830Dd": {
        farmId: 5,
        allocPoint: 5359412,
        token0: new Token(ChainId.SMARTBCH, '0xe11829a7d5d8806bb36e118461a1012588fafd89', 18, 'SPICE', 'SPICE'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0x41075d2Ea8BEF1CAfb24D9Bd2061b620cbc05B60": {
        farmId: 6,
        allocPoint: 5231764,
        token0: new Token(ChainId.SMARTBCH, '0x675E1d6FcE8C7cC091aED06A68D079489450338a', 18, 'ARG', 'Bitcoin Cash Argentina'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0xc47B0B4B51EE06De0daF02517D78f0473B776633": {
        farmId: 9,
        allocPoint: 13828619,
        token0: new Token(ChainId.SMARTBCH, '0x265bD28d79400D55a1665707Fa14A72978FA6043', 2, 'CATS', 'CashCats'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0xD6EcaDB40b35D17f739Ec27285759d0ca119e3A1": {
        farmId: 10,
        allocPoint: 8850010,
        token0: new Token(ChainId.SMARTBCH, '0x3d13DaFcCA3a188DB340c81414239Bc2be312Ec9', 18, 'AXIEBCH', 'AxieBCH'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0xFCf26E0EB200692B3002f941eea0486d2E901aA9": {
        farmId: 11,
        allocPoint: 5519864,
        token0: new Token(ChainId.SMARTBCH, '0x2f309b9d47b1ce7f0ec30a26bab2deab8c4ea5e9', 18, 'SHIBBCH', 'Shiba BCH'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0xCFcBC90e617a3996355761b52dF2830B7b6718d0": {
        farmId: 12,
        allocPoint: 4639249,
        token0: new Token(ChainId.SMARTBCH, '0x741746C2Cf4117730d7f087e8492dF595b4fd283', 18, 'DOGE', 'DOGEBCH'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0xf9D33ABfaF59fd19077f44399A8971621Cd2eA55": {
        farmId: 13,
        allocPoint: 3871740,
        token0: new Token(ChainId.SMARTBCH, '0xFfA2394B61D3dE16538a2Bbf3491297Cc5a7C79a', 18, 'UAT', 'UatX Token'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0xCabdb1321CEAb169935a0c9d4c856250766C3df7": {
        farmId: 14,
        allocPoint: 3279854,
        token0: new Token(ChainId.SMARTBCH, '0xB5b1939ef0a3743d0Ae9282DbA62312b614A5Ac0', 18, 'POTA', 'Potato'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0xbE48dC2353a460668A5D859C66e4472661581998": {
        farmId: 15,
        allocPoint: 3150102,
        token0: new Token(ChainId.SMARTBCH, '0xF2d4D9c65C2d1080ac9e1895F6a32045741831Cd', 2, 'HONK', 'Honk'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0x12E03015A85A0c2c1eca69486147608ABB0b801c": {
        farmId: 16,
        allocPoint: 2859362,
        token0: FLEXUSD,
        token1: new Token(ChainId.SMARTBCH, '0x2f309b9d47b1ce7f0ec30a26bab2deab8c4ea5e9', 18, 'SHIBBCH', 'Shiba BCH'),
      },
      "0x6B68f5D7d0531207a01e9AC16cfCd223D2139D28": {
        farmId: 17,
        allocPoint: 2806248,
        token0: new Token(ChainId.SMARTBCH, '0x7eBeAdb95724a006aFaF2F1f051B13F4eBEBf711', 2, '$KITTEN', 'CashKitten'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0x24615e918AD078900BfE13F4cd26876Bae64dD75": {
        farmId: 18,
        allocPoint: 2603255,
        token0: new Token(ChainId.SMARTBCH, '0x0b00366fBF7037E9d75E4A569ab27dAB84759302', 18, 'LAW', 'LAWTOKEN'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0xa331430473ABA2337698fD95a7c2fCf376DEbFb1": {
        farmId: 19,
        allocPoint: 2579629,
        token0: new Token(ChainId.SMARTBCH, '0xC41C680c60309d4646379eD62020c534eB67b6f4', 18, 'XMIST', 'MISTbar'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0x1c47c2a72e86B9B488f436F7aC76ACc61e531926": {
        farmId: 20,
        allocPoint: 2551975,
        token0: new Token(ChainId.SMARTBCH, '0x481De06DCA0198844faA36FCa04Db364e5c2f86C', 6, 'MAZE', 'MAZE'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0xA32B73445dBc075dA5054503171362D790164dC9": {
        farmId: 21,
        allocPoint: 2539125,
        token0: new Token(ChainId.SMARTBCH, '0x4F1480ba79F7477230ec3b2eCc868E8221925072', 18, 'KONRA', 'Konra'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0xE3e155c22685F7ceAB3F429CA60f302bCFb13616": {
        farmId: 22,
        allocPoint: 2537287,
        token0: new Token(ChainId.SMARTBCH, '0xB5b1939ef0a3743d0Ae9282DbA62312b614A5Ac0', 18, 'POTA', 'Potato'),
        token1: FLEXUSD,
      },
      "0x0663B29E3CAa8F2DB0313eA8B3E942a0431429cf": {
        farmId: 23,
        allocPoint: 2516289,
        token0: MIST[ChainId.SMARTBCH],
        token1: new Token(ChainId.SMARTBCH, '0xC41C680c60309d4646379eD62020c534eB67b6f4', 18, 'XMIST', 'MISTbar'),
      },
      "0x211c0d74b1213A40Bdfd61490A9893353544ea46": {
        farmId: 24,
        allocPoint: 2514742,
        token0: new Token(ChainId.SMARTBCH, '0x5a3bB59F34D60E9EB5643Fb80C8D712275F6a96A', 18, 'PHA', 'Alpha'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0x8e5EdB62775c1Cd003804Ec2a8242E5E0393876b": {
        farmId: 25,
        allocPoint: 2509731,
        token0: new Token(ChainId.SMARTBCH, '0x80453ACDfE0073D6743B27D72e06F48777EeAd80', 0, 'ZOMBIE', 'ZOMBIE'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0x49260567a5610414954a1D8F0E7774104FC5CAED": {
        farmId: 26,
        allocPoint: 2503518,
        token0: new Token(ChainId.SMARTBCH, '0x98Dd7eC28FB43b3C4c770AE532417015fa939Dd3', 18, 'FLEX', 'FLEX Coin'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0x64c379ab93b859AdA71b8AbACA77BeD104a5DbCa": {
        farmId: 27,
        allocPoint: 2499024,
        token0: new Token(ChainId.SMARTBCH, '0x9288df32951386A8254aEaF80a66B78cCaf75b82', 18, 'sBUSD', 'Smart BUSD'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0xFEC4202E22d0cd950aFC52622114e787FFFa0F53": {
        farmId: 28,
        allocPoint: 2499024,
        token0: new Token(ChainId.SMARTBCH, '0xFC27A40259f5d36F647b1142443Ed8941334C608', 18, 'C4Q', 'C4Q'),
        token1: WBCH[ChainId.SMARTBCH],
      },
      "0x98A03761Fe62b9A1FD7888D86f70E94a40ACD511": {
        farmId: 29,
        allocPoint: 2499024,
        token0: new Token(ChainId.SMARTBCH, '0xB24D7763516bca9656779d760be9a32490f46E27', 18, 'HODL', 'HODL'),
        token1: WBCH[ChainId.SMARTBCH],
      },
    },
    [ChainId.SMARTBCH_AMBER]: {
      "0x07DE6fc05597E0E4c92C83637A8a0CA411f3a769": {
        farmId: 0,
        allocPoint: 1000,
        token0: WBCH[ChainId.SMARTBCH_AMBER],
        token1: new Token(ChainId.SMARTBCH_AMBER, '0xC6F80cF669Ab9e4BE07B78032b4821ed5612A9ce', 18, 'sc', 'testcoin2'),
      },
    }
  };

  const kashiPairs = [] // unused
  const swapPairs = []
  const farms = []

  for (const [pairAddress, pair] of Object.entries(hardcodedPairs[chainId])) {
    swapPairs.push({
      id: pairAddress,
      reserveUSD: "100000",
      totalSupply: "1000",
      timestamp: "1599830986",
      token0: {
        id: pair.token0.address,
        name: pair.token0.name,
        symbol: pair.token0.symbol,
      },
      token1: {
        id: pair.token1.address,
        name: pair.token1.name,
        symbol: pair.token1.symbol,
      },
    })

    const f = {
      pair: pairAddress,
      symbol: `${hardcodedPairs[chainId][pairAddress].token0.symbol}-${hardcodedPairs[chainId][pairAddress].token1.symbol}`,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      pool: usePool(pairAddress),
      allocPoint: pair.allocPoint,
      balance: "1000000000000000000",
      chef: 0,
      id: pair.farmId,
      pendingSushi: undefined,
      pending: 0,
      owner: {
        id: MASTERCHEF_ADDRESS[chainId],
        sushiPerBlock: "100000000000000000000",
        totalAllocPoint: "999949643"
      },
      userCount: 1,
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    f.pendingSushi = usePendingSushi(f)
    f.pending = Number.parseFloat(f.pendingSushi?.toFixed())

    farms.push(f);
  }

  const flexUSDMistPool = farms[1].pool;
  const bchFlexUSDPool = farms[3].pool;
  let bchPriceUSD = 0;
  let mistPriceUSD = 0;
  if (bchFlexUSDPool.reserves) {
    bchPriceUSD = Number.parseFloat(bchFlexUSDPool.reserves[1].toFixed()) / Number.parseFloat(bchFlexUSDPool.reserves[0].toFixed());
  }
  if (flexUSDMistPool.reserves) {
    mistPriceUSD = 1. / ( Number.parseFloat(flexUSDMistPool.reserves[0].toFixed()) / Number.parseFloat(flexUSDMistPool.reserves[1].toFixed()))
  }

  let v2PairsBalances = {};
  let fetchingV2PairBalances = false;

  for (let i=0; i<farms.length; i+=8) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [partial_v2PairsBalances, partial_fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
        MASTERCHEF_ADDRESS[chainId],
        farms.slice(i, Math.min(i+8, farms.length)).map((farm) => new Token(chainId, farm.pair, 18, 'LP', 'LP Token'))
      )

      v2PairsBalances = {
        ...v2PairsBalances,
        ...partial_v2PairsBalances,
      };

      if (partial_fetchingV2PairBalances) {
        fetchingV2PairBalances = true;
      }
  }
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
      } else {
        farms[i].tvl = "0";
      }
    }
  }

  const positions = usePositions(chainId)

  // const averageBlockTime = useAverageBlockTime()
  const averageBlockTime = 6;

  // const masterChefV1TotalAllocPoint = useMasterChefV1TotalAllocPoint()

  const masterChefV1SushiPerBlock = useMasterChefV1SushiPerBlock()

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

    const blocksPerDay = 15684 // calculated empirically

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
        rewardPrice: +mistPriceUSD,
      }

      const defaultRewards = [defaultReward]

      return defaultRewards
    }

    const rewards = getRewards()

    const balance = Number(pool.balance / 1e18);

    const roiPerBlock = rewards.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.rewardPerBlock * currentValue.rewardPrice
    }, 0) / pool.tvl

    const roiPerDay = roiPerBlock * blocksPerDay

    const roiPerYear = roiPerDay * 365

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
      roiPerYear,
      rewards,
    }
  }

  const FILTER = {
    all: (farm) => farm.allocPoint !== '0',
    portfolio: (farm) => farm.pending !== 0,
    sushi: (farm) => farm.pair.type === PairType.SWAP && farm.allocPoint !== '0',
    kashi: (farm) => farm.pair.type === PairType.KASHI && farm.allocPoint !== '0',
    '2x': (farm) => (farm.chef === Chef.MASTERCHEF_V2) && farm.allocPoint !== '0',
  }

  const data = farms
    .filter((farm) => {
      return (
        (swapPairs && swapPairs.find((pair) => pair.id === farm.pair)) ||
        (kashiPairs && kashiPairs.find((pair) => pair.id === farm.pair))
      )
    })
    .map(map)
    .filter((farm) => {
      return type in FILTER ? FILTER[type](farm) : true
    })

  const options = {
    keys: ['pair.id', 'pair.token0.symbol', 'pair.token1.symbol'],
    threshold: 0.4,
  }

  const { result, term, search } = useFuse({
    data,
    options,
  })

  return (
    <Container id="farm-page" className="grid h-full grid-cols-4 py-4 mx-auto md:py-8 lg:py-12 gap-9" maxWidth="7xl">
      <Head>
        <title>Farm | Mist</title>
        <meta key="description" name="description" content="Farm MIST" />
      </Head>
      <div className={classNames('sticky top-0 hidden lg:block md:col-span-1')} style={{ maxHeight: '40rem' }}>
        <Menu positionsLength={positions.length} farms={farms} />
      </div>
      <div className={classNames('space-y-6 col-span-4 lg:col-span-3')}>
        <Search
          search={search}
          term={term}
          inputProps={{
            className:
              'relative w-full bg-transparent border border-transparent focus:border-gradient-r-blue-pink-dark-900 rounded placeholder-secondary focus:placeholder-primary font-bold text-base px-6 py-3.5',
          }}
        />

        <div className="flex items-center text-lg font-bold text-high-emphesis whitespace-nowrap">
          Farms{' '}
          <div className="w-full h-0 ml-4 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20"></div>
        </div>

        <FarmList farms={result} term={term} />
      </div>
    </Container>
  )
}
