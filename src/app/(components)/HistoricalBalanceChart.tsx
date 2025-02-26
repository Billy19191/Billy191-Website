import { FC, memo } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  // Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  ChartContainer,
  ChartConfig as ChartConfigType,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { commaNumber } from '@/lib/utils'
import UsdcIcon from '../../../public/crypto/UsdcIcon'

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

const ChartConfig = {
  // Add your chart configuration here
}

const HistoricalBalanceChart: FC<iHistoricalBalanceChart> = ({
  newDataFormat,
  minYValue,
}) => {
  const groupedData = groupDataByDate(newDataFormat)

  return (
    <>
      <div className="text-center font-mono font-semibold text-lg animate-slowfade">
        Historical Balance
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer
          config={ChartConfig as ChartConfigType}
          className="font-mono text-sm"
        >
          <AreaChart
            data={groupedData}
            margin={{ top: 10, right: 30, left: 30, bottom: 30 }}
            accessibilityLayer={true}
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
              tickFormatter={(tick) => {
                const date = new Date(tick)
                return date.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                })
              }}
              interval="preserveEnd"
              tick={{ dy: 15 }}
              tickLine={false}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  animationEasing="ease-in-out"
                  formatter={(value: number | string | (number | string)[]) => {
                    if (Array.isArray(value)) {
                      return `${commaNumber(value[0] as number)} USDC`
                    }
                    return (
                      <>
                        {commaNumber(value as number)} <UsdcIcon size={16} />
                      </>
                    )
                  }}
                  labelFormatter={(label) => (
                    <strong>{new Date(label).toLocaleDateString()}</strong>
                  )}
                  wrapperStyle={{ padding: '0 100px' }}
                />
              }
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
              tick={{ dx: -10 }}
            />
            {/* <Tooltip
            // cursor={{
            //   stroke: '#BABABA',
            //   strokeWidth: 1,
            //   strokeDasharray: '4 4',
            // }}
            contentStyle={{
              borderRadius: '4px',
              padding: '12px',
              fontFamily: 'monospace',
            }}
            formatter={(value) => [
              `${parseFloat(value as string).toFixed(2)} USDC`,
            ]}
          /> */}
            <Area
              dataKey="y"
              stroke="#E50046"
              strokeWidth={1.5}
              fill="url(#colorRed)"
              // fillOpacity={0.4}
              isAnimationActive={true}
              animationDuration={500}
              animationEasing="ease-in-out"
              type="natural"
            />
          </AreaChart>
        </ChartContainer>
      </ResponsiveContainer>
    </>
  )
}

export default memo(HistoricalBalanceChart)
