import { FC } from 'react'
import UsdcIcon from '../../../public/crypto/UsdcIcon'
import { commaNumber } from '@/lib/utils'
import dayjs from 'dayjs'

interface CurrentBalanceBoxProps {
  currentBalance: number
}
const CurrentBalanceBox: FC<CurrentBalanceBoxProps> = ({ currentBalance }) => {
  return (
    <div className="flex flex-col items-center gap-y-3">
      <h2>Current Balance</h2>
      <div className="text-sm font-thin mb-4">
        Latest - {dayjs().format('DD MMM HH:mm')}
      </div>
      <div className="flex items-center gap-x-2 !font-bold text-3xl">
        <h3>{commaNumber(currentBalance)}</h3>
        <UsdcIcon size={24} />
      </div>
    </div>
  )
}
export default CurrentBalanceBox
