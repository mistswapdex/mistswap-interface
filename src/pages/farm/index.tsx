import { useActiveWeb3React, useFuse } from '../../hooks'

import Container from '../../components/Container'
import FarmList from '../../features/onsen/FarmList'
import Head from 'next/head'
import Menu from '../../features/onsen/FarmMenu'
import React, { useEffect } from 'react'
import Search from '../../components/Search'
import { classNames } from '../../functions'
import { usePositions, usePendingSushi } from '../../features/onsen/hooks'
import { useRouter } from 'next/router'
import { getFarmFilter, useUpdateFarmFilter } from '../../state/user/hooks'
import { useMasterChefV1HealthCheck } from '../../services/graph'

import { default as GraphFarms } from './graphFarms'
import { default as RpcFarms } from './rpcFarms'

export default function Farm(): JSX.Element {
  const { chainId } = useActiveWeb3React()
  const router = useRouter()

  const type = router.query.filter as string

  const savedFilter = getFarmFilter()

  if (!type && savedFilter) {
    router.push(`/farm?filter=${savedFilter}`)
  }

  const updateFarmFilter = useUpdateFarmFilter()
  updateFarmFilter(type)

  const graphAvailable = useMasterChefV1HealthCheck()

  return (
    graphAvailable ? <GraphFarms filter={type}></GraphFarms> : <RpcFarms filter={type}></RpcFarms>
  )
  //   <Container id="farm-page" className="lg:grid lg:grid-cols-4 h-full py-4 mx-auto md:py-8 lg:py-12 gap-9" maxWidth="7xl">
  //     <Head>
  //       <title>Farm | Mist</title>
  //       <meta key="description" name="description" content="Farm MIST" />
  //     </Head>
  //     <div className={classNames('px-3 md:px-0 lg:block md:col-span-1')} style={{ maxHeight: '40rem' }}>
  //       <Menu positionsLength={positions.length} />
  //     </div>
  //     <div className={classNames('space-y-6 col-span-4 lg:col-span-3')}>
  //       <Search
  //         search={search}
  //         term={term}
  //         className={classNames('px-3 md:px-0 ')}
  //         inputProps={{
  //           className:
  //             'relative w-full bg-transparent border border-transparent focus:border-gradient-r-blue-pink-dark-900 rounded placeholder-secondary focus:placeholder-primary font-bold text-base px-6 py-3.5',
  //         }}
  //       />

  //       <div className="hidden md:block flex items-center text-lg font-bold text-high-emphesis whitespace-nowrap">
  //         Farms{' '}
  //         <div className="w-full h-0 ml-4 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20"></div>
  //       </div>

  //       <FarmList farms={result} term={term} />
  //     </div>
  //   </Container>
  // )
}
