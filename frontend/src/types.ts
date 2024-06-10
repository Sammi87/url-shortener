export interface UrlObject {
  _id: string;
  shortUrl: string;
  longUrl: string;
}

export type UrlListResponse = Array<UrlObject>;
