import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface DefiChainStatus {
  status: {
    description: 'outage' | 'operational'
  }
}

export const statusWebsiteSlice = createApi({
  reducerPath: 'websiteStatus',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.status.jellyfishsdk.com'
  }),
  endpoints: builder => ({
    getBlockchainStatus: builder.query<DefiChainStatus, any>({
      query: () => ({
        url: '/blockchain',
        method: 'GET'
      })
    }),
    // Ocean API
    getOceanStatus: builder.query<DefiChainStatus, any>({
      query: () => ({
        url: '/overall',
        method: 'GET'
      })
    })
  })
})

const {
  useGetBlockchainStatusQuery,
  useGetOceanStatusQuery
} = statusWebsiteSlice

export {
  useGetBlockchainStatusQuery,
  useGetOceanStatusQuery
}
