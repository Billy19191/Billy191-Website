'use client'

import { queryHistoricalGraphQL } from '@/utils/queryHistoricalGraphQL'
import { useEffect, useMemo, useRef, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import dayjs from 'dayjs'
export default function WealthPage() {
  const [morphoData, setMorphoData] = useState()
  const morphoDataRef = useRef(morphoData)
  const memoizedMorphoData = useMemo(() => morphoData, [morphoData])

  useEffect(() => {
    queryHistoricalGraphQL({
      startTimestamp: 1740236400,
      endTimestamp: 1740330582,
      interval: 'HOUR',
    }).then((data) => {
      setMorphoData(data)
    })
  }, [])

  useEffect(() => {
    if (morphoData) {
      const cleanData =
        memoizedMorphoData?.userByAddress?.vaultPositions[1].historicalState
      cleanData.assets.map((asset) => {
        console.log({
          // x: new Date(asset.x * 1000).toLocaleString(),
          x: dayjs.unix(asset.x).format('YYYY-MM-DD HH:mm:ss'),
          y: asset.y.toFixed(2) / 1000000 + ' USDC',
        })
        return {
          x: new Date(asset.x * 1000).toLocaleString(),
          y: asset.y.toFixed(2) / 1000000,
        }
      })
    }
  }, [memoizedMorphoData, morphoData])

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <TypeAnimation
          sequence={[
            'Welcome to',
            1000,
            `🤑 Billy's House!`,
            2000,
            'Coming soon ...',
            5000,
            () => {
              console.log('Sequence completed')
            },
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          className="!text-4xl sm:text-6xl font-bold text-center"
        />
      </div>
    </>
  )
}
