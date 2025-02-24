import { FC } from 'react'
import UsdcIcon from '../../../public/crypto/UsdcIcon'

interface CurrentBalanceBoxProps {
  currentBalance: number
}
const CurrentBalanceBox: FC<CurrentBalanceBoxProps> = ({ currentBalance }) => {
  return (
    <div className="flex flex-col items-center gap-y-10">
      <h2>Current Balance</h2>
      <div className="flex items-center gap-x-2 !font-bold text-3xl">
        <h3>{currentBalance.toFixed(2)}</h3>
        <UsdcIcon />
      </div>
    </div>
  )
}
export default CurrentBalanceBox
