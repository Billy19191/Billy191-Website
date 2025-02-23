import { client } from '@/app/layout'
import { gql } from '@apollo/client'

type TimeseriesOptions = {
  startTimestamp: number
  endTimestamp: number
  interval: string
}

export const queryHistoricalGraphQL = async (
  assetsOptions: TimeseriesOptions
) => {
  const { data } = await client.query({
    query: gql`
      query ($assetsOptions: TimeseriesOptions) {
        userByAddress(
          chainId: 8453
          address: "0x6fdfd0dee3e2aa16ba6c70b1398e640735d5c065"
        ) {
          address
          marketPositions {
            market {
              uniqueKey
            }
            borrowAssets
            borrowAssetsUsd
            supplyAssets
            supplyAssetsUsd
          }
          vaultPositions {
            vault {
              address
              name
            }
            assets
            assetsUsd
            shares
            historicalState {
              assets(options: $assetsOptions) {
                x
                y
              }
            }
          }
        }
      }
    `,
    variables: { assetsOptions },
  })
  return data
}
