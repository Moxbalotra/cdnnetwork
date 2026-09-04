export interface Candidate {
  srNo: number;
  ward: number;
  name: string;
  party: string;
}

export interface WardPoint {
  ward: number;
  lat: number;
  lon: number;
}

export interface PortalConfig {
  dashboardBanner: string;
  wardMapEmbed: string;
  lastUpdated: string;
  wardCount: number;
  wardPDFs: Record<number, string>;
  wardPoints: WardPoint[];
}

export type TabType = 'dashboard' | 'wardmap' | 'voterlist' | 'candidate' | 'result';
export type MapType = 'leaflet' | 'google';
export type ThemeMode = 'dark' | 'light';
