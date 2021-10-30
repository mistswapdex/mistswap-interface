import { useActiveWeb3React, useSushiContract } from '../../hooks'

import { BigNumber } from '@ethersproject/bignumber'
import { Chef } from './enum'
import { Zero } from '@ethersproject/constants'
import { useCallback } from 'react'
import { useChefContract } from './hooks'
import { getGasPrice } from '../../functions/trade'

export default function useMasterChef(chef: Chef) {
  const { account } = useActiveWeb3React()

  const sushi = useSushiContract()

  const contract = useChefContract(chef)

  // Deposit
  const deposit = useCallback(
    async (pid: number, amount: BigNumber) => {
      try {
        let tx

        if (chef === Chef.MASTERCHEF) {
          tx = await contract?.deposit(pid, amount, {
            gasPrice: getGasPrice(),
          })
        } else {
          tx = await contract?.deposit(pid, amount, account, {
            gasPrice: getGasPrice(),
          })
        }

        return tx
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [account, chef, contract]
  )

  // Withdraw
  const withdraw = useCallback(
    async (pid: number, amount: BigNumber) => {
      try {
        let tx

        if (chef === Chef.MASTERCHEF) {
          tx = await contract?.withdraw(pid, amount, {
            gasPrice: getGasPrice(),
          })
        } else {
          tx = await contract?.withdraw(pid, amount, account, {
            gasPrice: getGasPrice(),
          })
        }

        return tx
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [account, chef, contract]
  )

  const harvest = useCallback(
    async (pid: number) => {
      try {
        let tx

        if (chef === Chef.MASTERCHEF) {
          tx = await contract?.deposit(pid, Zero, {
            gasPrice: getGasPrice(),
          })
        } else if (chef === Chef.MASTERCHEF_V2) {
          const pendingSushi = await contract?.pendingSushi(pid, account)

          const balanceOf = await sushi?.balanceOf(contract?.address)

          // If MasterChefV2 doesn't have enough sushi to harvest, batch in a harvest.
          if (pendingSushi.gt(balanceOf)) {
            tx = await contract?.batch(
              [
                contract?.interface?.encodeFunctionData('harvestFromMasterChef'),
                contract?.interface?.encodeFunctionData('harvest', [pid, account]),
              ],
              true
            )
          } else {
            tx = await contract?.harvest(pid, account, {
              gasPrice: getGasPrice(),
            })
          }
        }

        return tx
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [account, chef, contract, sushi]
  )

  const harvestAll = useCallback(
    async (farms: any[]) => {
      if (chef === Chef.MASTERCHEF) {
        throw Error("MasterChef version 1 is not supported")
      }

      try {
        let tx

        const pids = farms.map(farm => farm.id)
        const pendingSushis: BigNumber[] = await Promise.all(pids.map(pid => contract?.pendingSushi(pid, account)))
        const sum: BigNumber = pendingSushis.reduce((sum: BigNumber, value: BigNumber) => sum.add(value), BigNumber.from(0))
        const balanceOf: BigNumber = await sushi?.balanceOf(contract?.address)

        const calls = pids.map(pid => contract?.interface?.encodeFunctionData('harvest', [pid, account]));

        // If MasterChefV2 doesn't have enough sushi to harvest all farms, batch in a harvest.
        if (sum.gt(balanceOf)) {
          tx = await contract?.batch(
            [
              contract?.interface?.encodeFunctionData('harvestFromMasterChef'),
              ...calls
            ],
            true
          )
        } else {
          tx = await contract?.batch(
            calls,
            true
          )
        }

        return tx
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [account, chef, contract, sushi]
  )

  return { deposit, withdraw, harvest, harvestAll }
}
