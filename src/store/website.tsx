import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface DefiChainStatus {
  status: {
    description: "outage" | "operational";
  };
}

export interface AnnouncementText {
  en: string;
  de?: string;
  "zh-Hans"?: string;
  "zh-Hant"?: string;
  fr?: string;
  es?: string;
  it?: string;
}
export interface AnnouncementData {
  lang: AnnouncementText;
  /**
   * Versioned matching represented as semver satisfies
   */
  version?: string;
  url?: {
    ios?: string;
    android?: string;
    macos?: string;
    windows?: string;
    web: string;
  };
  /**
   * `id` will be stored in device's persistence storage. Therefore, each announcement's `id` should be unique string to enable close announcement function
   */
  id?: string;
  type?: "EMERGENCY" | "OTHER_ANNOUNCEMENT" | "OUTAGE" | "SCAN";
}

export const statusWebsiteSlice = createApi({
  reducerPath: "websiteStatus",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.status.jellyfishsdk.com",
  }),
  endpoints: (builder) => ({
    getBlockchainStatus: builder.query<DefiChainStatus, any>({
      query: () => ({
        url: "/blockchain",
        method: "GET",
      }),
    }),
    // Ocean API
    getOceanStatus: builder.query<DefiChainStatus, any>({
      query: () => ({
        url: "/overall",
        method: "GET",
      }),
    }),
  }),
});

// temp endpoint from wallet
export const announcementWebsiteSlice = createApi({
  reducerPath: "website",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wallet.defichain.com/api/v0",
  }),
  endpoints: (builder) => ({
    getAnnouncements: builder.query<AnnouncementData[], any>({
      query: () => ({
        url: "/announcements",
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          mode: "no-cors",
        },
      }),
    }),
  }),
});

const { useGetBlockchainStatusQuery, useGetOceanStatusQuery } =
  statusWebsiteSlice;

const { useGetAnnouncementsQuery } = announcementWebsiteSlice;

export {
  useGetBlockchainStatusQuery,
  useGetOceanStatusQuery,
  useGetAnnouncementsQuery,
};
