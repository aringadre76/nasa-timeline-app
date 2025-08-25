export interface NASAImage {
  href: string
  data: Array<{
    id?: string
    title?: string
    description?: string
    description_508?: string
    date_created?: string
    keywords?: string[]
    nas-id?: string
    media_type?: string
    center?: string
    photographer?: string
    location?: string
    secondary_creator?: string
    album?: string[]
  }>
  links?: Array<{
    href: string
    rel: string
    render: string
  }>
}

export interface NASAImageCollection {
  collection: {
    items: NASAImage[]
    metadata: {
      total_hits: number
    }
  }
}

export interface SearchParams {
  date?: string
  keywords?: string
  media_type?: string
  year_start?: string
  year_end?: string
}
