'use client'

import { useHistoricalGraphQL } from '@/app/(hooks)/useHistoricalGraphQL'
import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import HistoricalBalanceChart from '../(components)/HistoricalBalanceChart'
import CurrentBalanceBox from '../(components)/CurrentBalanceBox'
import TodayPNLBox from '../(components)/TodayPNLBox'

type morphoDataInterface = {
  userByAddress: {
    address: string
    marketPositions: {
      market: {
        address: string
        name: string
      }
      position: number
      positionUsd: number
    }[]
    vaultPositions: {
      vault: {
        address: string
        name: string
      }
      assets: number
      assetsUsd: number
      shares: string
      historicalState: {
        assets: {
          x: number
          y: number
        }[]
      }
    }[]
  }
}

export type newDataFormatInterface = {
  x: number
  y: number
}

export default function WealthPage() {
  const [morphoData, setMorphoData] = useState<morphoDataInterface | undefined>(
    undefined
  )
  const [isShowing, setIsShowing] = useState<boolean>(false)

  const queryParams = useMemo(
    () => ({
      startTimestamp: dayjs().subtract(1, 'month').unix(),
      endTimestamp: dayjs().unix(),
      interval: 'HOUR',
    }),
    []
  )

  const { data, loading, error } = useHistoricalGraphQL(queryParams)

  useEffect(() => {
    if (!loading && !error && data) {
      setMorphoData(data)
    }
  }, [data, loading, error])

  const newDataFormat: { x: string; y: number }[] = useMemo(() => {
    if (!morphoData) return []

    const cleanData = morphoData.userByAddress.vaultPositions[1]
      ?.historicalState || { assets: [] }
    return cleanData.assets
      .map((asset: newDataFormatInterface) => ({
        x: dayjs.unix(asset.x).format('YYYY-MM-DD HH:mm:ss'),
        y: asset.y / 1000000,
      }))
      .filter((asset: { x: string; y: number }) => asset.y > 0)
      .sort((a: { x: string; y: number }, b: { x: string; y: number }) =>
        a.x.localeCompare(b.x)
      )
  }, [morphoData])

  const minYValue = useMemo(() => {
    return newDataFormat.length > 0
      ? Math.min(...newDataFormat.map((d) => d.y))
      : 0
  }, [newDataFormat])

  useEffect(() => {
    if (newDataFormat.length > 0) {
      setIsShowing(true)
    }
  }, [newDataFormat])

  const currentBalance = useMemo(() => {
    if (!morphoData) return 0
    return morphoData.userByAddress.vaultPositions[1]?.assets / 1000000
  }, [morphoData])

  const pnlUsd = useMemo(() => {
    for (let i = 0; i < newDataFormat.length; i++) {
      if (
        dayjs
          .unix(
            morphoData?.userByAddress.vaultPositions[1]?.historicalState.assets[
              i
            ].x || 0
          )
          .isSame(dayjs(), 'day') &&
        dayjs
          .unix(
            morphoData?.userByAddress.vaultPositions[1]?.historicalState.assets[
              i + 1
            ].x || 0
          )
          .isSame(dayjs().subtract(1, 'day'), 'day')
      ) {
        const currentPnlValue =
          ((morphoData?.userByAddress?.vaultPositions[1]?.assets ?? 0) -
            (morphoData?.userByAddress?.vaultPositions[1]?.historicalState
              ?.assets[i + 1]?.y || 0)) /
          1000000
        const currentLatestDate = dayjs
          .unix(
            morphoData?.userByAddress?.vaultPositions[1]?.historicalState
              ?.assets[i + 1]?.x || 0
          )
          .format('DD MMM HH:mm')
        return { currentPnlValue, currentLatestDate }
      }
    }
    return {
      currentPnlValue: 0,
      currentLatestDate: '',
    }
  }, [morphoData, newDataFormat.length])
  // console.log(newDataFormat)
  return (
    <div className="h-full">
      <div className="text-center font-mono text-xl font-semibold mt-4 mb-6">
        Billy191's Portfolio
      </div>
      <div className="flex flex-col lg:flex-row font-mono w-full h-fit lg:h-full items-center justify-center gap-x-10">
        <div className="lg:border rounded px-10 py-6 lg:p-10 w-screen lg:w-5/12 h-72 lg:h-96">
          {isShowing ? (
            <HistoricalBalanceChart
              newDataFormat={newDataFormat}
              minYValue={minYValue}
            />
          ) : (
            <div className="flex justify-center items-center h-full font-mono animate-slowfade">
              Loading...
            </div>
          )}
        </div>
        <div className="w-screen lg:w-2/12 flex flex-col lg:gap-y-10">
          <div className="lg:border rounded px-10 py-6 lg:p-10 h-2/12">
            {isShowing ? (
              <div className="text-center font-mono font-semibold text-lg">
                <CurrentBalanceBox currentBalance={currentBalance} />
              </div>
            ) : (
              <div className="flex justify-center items-center font-mono">
                Loading...
              </div>
            )}
          </div>
          <div className="lg:border rounded px-10 py-6 lg:p-10 h-2/12">
            {isShowing ? (
              <div className="text-center font-mono font-semibold text-lg">
                <TodayPNLBox
                  pnlUsd={pnlUsd.currentPnlValue}
                  latestUpdate={pnlUsd.currentLatestDate}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center font-mono">
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
