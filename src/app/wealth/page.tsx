'use client'
import { TypeAnimation } from 'react-type-animation'
export default function wealthPage() {
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
