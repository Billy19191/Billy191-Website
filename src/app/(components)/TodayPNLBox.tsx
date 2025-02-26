import UsdcIcon from '../../../public/crypto/UsdcIcon'

interface TodayPNLBoxProps {
  pnlUsd: number
  latestUpdate: string
}
const TodayPNLBox = ({ pnlUsd, latestUpdate }: TodayPNLBoxProps) => {
  return (
    <div className="flex flex-col items-center gap-y-3">
      <h2>Today Earning</h2>
      <div className="text-sm font-thin mb-4">Snapshot - {latestUpdate}</div>
      <div className="flex items-center gap-x-2 !font-bold text-3xl">
        <h3>{pnlUsd.toFixed(2)}</h3>
        <UsdcIcon size={24} />
      </div>
    </div>
  )
}

export default TodayPNLBox
