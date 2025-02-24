'use client'

import { useHistoricalGraphQL } from '@/app/(hooks)/useHistoricalGraphQL'
import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import HistoricalBalanceChart from '../(components)/HistoricalBalanceChart'

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
  const [isShowing, setIsShowing] = useState(false)

  const { data, loading, error } = useHistoricalGraphQL({
    startTimestamp: dayjs().subtract(1, 'month').unix(),
    endTimestamp: dayjs().unix(),
    interval: 'HOUR',
  })

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

  console.log(newDataFormat)
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="border rounded p-10 w-5/12 h-2/5">
        {isShowing ? (
          <HistoricalBalanceChart
            newDataFormat={newDataFormat}
            minYValue={minYValue}
          />
        ) : (
          <div className="flex justify-center items-center h-full font-mono">
            Loading...
          </div>
        )}
      </div>
      <div className="border rounded p-10 w-2/12 h-2/12">
        {isShowing ? (
          <div className="text-center font-mono font-semibold text-lg">
            Current Balance
          </div>
        ) : (
          <div className="flex justify-center items-center h-full font-mono">
            Loading...
          </div>
        )}
      </div>
    </div>
  )
}
