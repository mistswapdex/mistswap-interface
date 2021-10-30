import { ChainId, CurrencyAmount, MASTERCHEF_V2_ADDRESS } from '@mistswapdex/sdk'
import NavLink from '../../components/NavLink'
import React, { useState } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useActiveWeb3React } from '../../hooks'
import { useWalletModalToggle } from '../../state/application/hooks'
import useMasterChef from './useMasterChef'
import { Chef } from './enum'
import { MIST } from '../../config/tokens'

const Menu = ({ positionsLength, farms }) => {
  useState()
  const { account, chainId } = useActiveWeb3React()
  const { i18n } = useLingui()
  const toggleWalletModal = useWalletModalToggle()

  const { harvestAll } = useMasterChef(Chef.MASTERCHEF_V2)
  const zero = CurrencyAmount.fromRawAmount(MIST[chainId], 0);
  const userFarms = [...(farms || [])].filter(farm => farm.pending);
  const total = userFarms ? userFarms.reduce((sum, farm) => farm.pendingSushi.add(sum), zero) : zero;

  return (
    <div className="space-y-4">
      {account ? (
        <NavLink
          exact
          href={`/farm?filter=portfolio`}
          activeClassName="font-bold bg-transparent border rounded text-high-emphesis border-transparent border-gradient-r-blue-pink-dark-900"
        >
          <a className="flex items-center justify-between px-4 py-6 text-base font-bold border border-transparent rounded cursor-pointer bg-dark-900 hover:bg-dark-800">
            Your Farms
          </a>
        </NavLink>
      ) : (
        <a
          className="striped-background text-secondary flex items-center justify-between px-4 py-6 text-base font-bold border border-transparent rounded cursor-pointer bg-dark-900 hover:bg-dark-800"
          onClick={toggleWalletModal}
        >
          Your Farms
        </a>
      )}

      <div className="w-full h-0 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20" />

      <NavLink
        exact
        href="/farm"
        activeClassName="font-bold bg-transparent border rounded text-high-emphesis border-transparent border-gradient-r-blue-pink-dark-900"
      >
        <a className="flex items-center justify-between px-4 py-6 text-base font-bold border border-transparent rounded cursor-pointer bg-dark-900 hover:bg-dark-800">
          {i18n._(t`All Farms`)}
        </a>
      </NavLink>

      {/* <Link href=""> */}
        <a className="flex items-center justify-between px-4 py-6 text-base font-bold border border-transparent rounded cursor-pointer bg-dark-900 hover:bg-dark-800"
           onClick={async () => await harvestAll(userFarms)}
        >
          {i18n._(t`Harvest All (${total.toFixed(2)} MIST)`)}
        </a>
      {/* </Link> */}

      {/*chainId === ChainId.MAINNET && (
        <>
          <NavLink
            exact
            href={`/farm?filter=kashi`}
            activeClassName="font-bold bg-transparent border rounded text-high-emphesis border-transparent border-gradient-r-blue-pink-dark-900"
          >
            <a className="flex items-center justify-between px-4 py-6 text-base font-bold border border-transparent rounded cursor-pointer bg-dark-900 hover:bg-dark-800">
              Kashi Farms
            </a>
          </NavLink>
          <NavLink
            exact
            href={`/farm?filter=sushi`}
            activeClassName="font-bold bg-transparent border rounded text-high-emphesis border-transparent border-gradient-r-blue-pink-dark-900"
          >
            <a className="flex items-center justify-between px-4 py-6 text-base font-bold border border-transparent rounded cursor-pointer bg-dark-900 hover:bg-dark-800">
              MISTswap Farms
            </a>
          </NavLink>
        </>
      )*/}

      {/*(chainId === ChainId.MAINNET || chainId === ChainId.MATIC) && (
        <NavLink
          exact
          href={`/farm?filter=2x`}
          activeClassName="bg-transparent border rounded text-high-emphesis border-transparent border-gradient-r-blue-pink-dark-900"
        >
          <a className="flex items-center justify-between px-4 py-6 text-base font-bold border border-transparent rounded cursor-pointer bg-dark-900 hover:bg-dark-800">
            2x Reward Farms
          </a>
        </NavLink>
      )*/}
    </div>
  )
}

export default Menu
