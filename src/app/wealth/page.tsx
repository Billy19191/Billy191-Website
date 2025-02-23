'use client'
import { queryHistoricalGraphQL } from '@/utils/queryHistoricalGraphQL'
import { TypeAnimation } from 'react-type-animation'
export default async function wealthPage() {
  const morphoData = await queryHistoricalGraphQL({
    startTimestamp: 1740236400,
    endTimestamp: 1740307605,
    interval: 'HOUR',
  })

  console.log(morphoData)
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <TypeAnimation
          sequence={[
            'Welcome to',
            1000,
            `🤑 Billy's Wealth Dashboard`,
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
