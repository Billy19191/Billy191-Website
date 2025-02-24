import { FC } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type iHistoricalBalanceChart = {
  newDataFormat: { x: string; y: number }[]
  minYValue: number
}

const groupDataByDate = (data: { x: string; y: number }[]) => {
  const groupedData: { [key: string]: { x: string; y: number } } = {}

  data.forEach((item) => {
    const date = new Date(item.x).toLocaleDateString('en-US')
    if (!groupedData[date]) {
      groupedData[date] = item
    }
  })

  return Object.values(groupedData)
}

const HistoricalBalanceChart: FC<iHistoricalBalanceChart> = ({
  newDataFormat,
  minYValue,
}) => {
  const groupedData = groupDataByDate(newDataFormat)

  return (
    <>
      <div className="text-center font-mono font-semibold text-lg">
        Historical Balance
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={groupedData}
          margin={{ top: 10, right: 30, left: 30, bottom: 30 }}
        >
          <defs>
            <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E50046" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#E50046" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="x"
            className="font-mono text-sm"
            ticks={[
              groupedData[0].x,
              ...groupedData
                .filter(
                  (_, index) => index % Math.floor(groupedData.length / 6) === 0
                )
                .map((item) => item.x),
              groupedData[groupedData.length - 1].x,
            ]}
            tickFormatter={(tick) => {
              const date = new Date(tick)
              return date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
              })
            }}
            interval="preserveEnd"
          />
          <YAxis
            domain={[minYValue, 'auto']}
            className="font-mono text-sm"
            label={{
              value: 'USDC',
              angle: -90,
              position: 'insideLeft',
              dx: -30,
            }}
          />
          <Tooltip
            cursor={{
              stroke: '#BABABA',
              strokeWidth: 1,
              strokeDasharray: '4 4',
            }}
            contentStyle={{
              borderRadius: '4px',
              padding: '12px',
            }}
            formatter={(value, _, props) => [
              `${parseFloat(value as string).toFixed(2)} USDC`,
              new Date(props.payload.x).toLocaleString('en-US', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              }),
            ]}
          />
          <Area
            dataKey="y"
            stroke="#E50046"
            strokeWidth={1.5}
            fill="url(#colorRed)"
            // fillOpacity={0.4}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

export default HistoricalBalanceChart
