export enum AssetType {
  LiveWebinar = 'Live Webinar',
  OnDemandWebinar = 'On-Demand Webinar',
  Whitepaper = 'Whitepaper',
  OnDemandPodcast = 'on-demand podcast',
}

export interface AssetStat {
  value: string;
  label: string;
}

export interface AssetQuote {
  body: string;
  attribution: string;
}

export interface LeadGenAsset {
  id: string;
  name: string;
  description: string;
  executionDate?: Date;
  expirationDate?: Date;
  sponsorName: string;
  assetType: AssetType;
  speakers?: Person[];
  createdDate: Date;
  createdBy: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
  // Optional rich-content fields. When present they enable the asset detail
  // page to render hand-authored stat callouts, a pull-quote, a real outline,
  // and a downloadable PDF after unlock.
  pdfUrl?: string;
  pageCount?: number;
  stats?: AssetStat[];
  quote?: AssetQuote;
  outline?: string[];
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  companyName: string;
  email: string;
}

export interface SignUpPayload {
  id: string;
  person: Person;
  signupDate: Date;
  assetId: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface ApiError {
  error: string;
}
