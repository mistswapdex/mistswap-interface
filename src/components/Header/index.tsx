import { ChainId, Currency, NATIVE, MIST_ADDRESS } from '@mistswapdex/sdk'
import { Feature, featureEnabled } from '../../functions/feature'
import React, { useEffect, useState } from 'react'

import Buy from '../../features/on-ramp/ramp'
import ExternalLink from '../ExternalLink'
import Image from 'next/image'
import LanguageSwitch from '../LanguageSwitch'
import Link from 'next/link'
import More from './More'
import NavLink from '../NavLink'
import { Popover } from '@headlessui/react'
import QuestionHelper from '../QuestionHelper'
import Web3Network from '../Web3Network'
import Web3Status from '../Web3Status'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useETHBalances } from '../../state/wallet/hooks'
import { useLingui } from '@lingui/react'
import { isMobile } from 'react-device-detect'
import AddToken from '../AddToken'
import ThemeSwitch from '../ThemeSwitch'

// import { ExternalLink, NavLink } from "./Link";
// import { ReactComponent as Burger } from "../assets/images/burger.svg";

function AppBar(): JSX.Element {
  const { i18n } = useLingui()
  const { account, chainId, library } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  return (
    //     // <header className="flex flex-row justify-between w-screen flex-nowrap">
    <header className="flex-shrink-0 w-full">
      <Popover as="nav" className="z-10 w-full bg-transparent header-border-b">
        {({ open }) => (
          <>
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image src="/logo.png" alt="Mist" width="32px" height="32px" />
                  <div className="hidden sm:block sm:ml-4">
                    <div className="flex space-x-2">
                      {/* <Buy /> */}
                      <NavLink href="/swap">
                        <a
                          id={`swap-nav-link`}
                          className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                        >
                          {i18n._(t`Swap`)}
                        </a>
                      </NavLink>
                      <NavLink href="/pool">
                        <a
                          id={`pool-nav-link`}
                          className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                        >
                          {i18n._(t`Pool`)}
                        </a>
                      </NavLink>
                        <>
                        </>
                      )}
                      {chainId && featureEnabled(Feature.STAKING, chainId) && (
                        <NavLink href={'/stake'}>
                          <a
                            id={`stake-nav-link`}
                            className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                          >
                            {i18n._(t`Stake`)}
                          </a>
                        </NavLink>
                      )}
                      {chainId && featureEnabled(Feature.ANALYTICS, chainId) && (
                      )}
                    </div>
                  </div>
                </div>

                <div className="fixed bottom-0 left-0 z-10 flex flex-row items-center justify-center w-full p-4 lg:w-auto bg-dark-1000 lg:relative lg:p-0 lg:bg-transparent">
                  <div className="flex items-center justify-between w-full space-x-2 sm:justify-end">
                    {chainId && [ChainId.SMARTBCH].includes(chainId) && library && library.provider.isMetaMask && (
                      <>
                        <AddToken
                          imageProps={{src: "/images/tokens/xmist-square.jpg", alt: "xMIST"}}
                          text={i18n._(t`Add xMIST to your MetaMask wallet`)}
                          metamaskProps={{
                            address: '0xC41C680c60309d4646379eD62020c534eB67b6f4',
                            symbol: 'xMIST',
                            decimals: 18,
                            image: 'https://assets.mintwap.cash/blockchains/smartbch/assets/0xC41C680c60309d4646379eD62020c534eB67b6f4/logo.png',
                          }} />
                      </>
                    )}

                    {chainId && chainId in MIST_ADDRESS && library && library.provider.isMetaMask && (
                      <>
                        <AddToken
                          imageProps={{src: "/images/tokens/mist-square.jpg", alt: "MIST"}}
                          text={i18n._(t`Add MIST to your MetaMask wallet`)}
                          metamaskProps={{
                            address: MIST_ADDRESS[chainId],
                            symbol: 'MIST',
                            decimals: 18,
                            image: 'https://assets.mistswap.cash/blockchains/smartbch/assets/0x5fA664f69c2A4A3ec94FaC3cBf7049BD9CA73129/logo.png',
                          }} />
                      </>
                    )}

                    {library && library.provider.isMetaMask && (
                      <div className="hidden sm:inline-block">
                        <Web3Network />
                      </div>
                    )}

                    <div className="w-auto flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
                      {account && chainId && userEthBalance && (
                        <>
                          <div className="px-3 py-2 text-primary text-bold">
                            {userEthBalance?.toSignificant(4)} {NATIVE[chainId].symbol}
                          </div>
                        </>
                      )}
                      <Web3Status />
                    </div>
                    <div className="hidden md:block sm:block">
                      <LanguageSwitch />
                    </div>
                    <ThemeSwitch/>
                    <More />
                  </div>
                </div>
                <div className="flex -mr-2 sm:hidden">
                  {/* Mobile language switch */}
                  {isMobile && (
                    <>
                      <div className="inline-flex items-center">
                        <LanguageSwitch />
                      </div>
                    </>
                  )}
                  {/* Mobile menu button */}
                  <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-high-emphesis focus:outline-none">
                    <span className="sr-only">{i18n._(t`Open main menu`)}</span>
                    {open ? (
                      <svg
                        className="block w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      // <X title="Close" className="block w-6 h-6" aria-hidden="true" />
                      <svg
                        className="block w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                      // <Burger title="Burger" className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
              </div>
            </div>

            <Popover.Panel className="sm:hidden">
              <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">
                <Link href={'/swap'}>
                  <a
                    id={`swap-nav-link`}
                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  >
                    {i18n._(t`Swap`)}
                  </a>
                </Link>
                <Link href={'/pool'}>
                  <a
                    id={`pool-nav-link`}
                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  >
                    {i18n._(t`Pool`)}
                  </a>
                </Link>


                {chainId && featureEnabled(Feature.MIGRATE, chainId) && (
                <Link href={'/migrate'}>
                  <a
                    id={`migrate-nav-link`}
                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  >
                    {i18n._(t`Migrate`)}
                  </a>
                </Link>
                )}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </header>
  )
}

export default AppBar
