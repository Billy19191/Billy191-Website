'use client'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://blue-api.morpho.org/graphql',
  cache: new InMemoryCache(),
})

export default function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
