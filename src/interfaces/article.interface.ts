export interface IArticle {
  title: string
  authors: string
  abstract?: string
  published_journal: string
  published_year: string
  published_volume?: string | null
  published_number: string
  pages: string
  cite?: string
  is_russian: boolean
  is_conference: boolean
  links: {
    pdf?: string
    wos?: string
    scopus?: string
    doi?: string
    rinc?: string
    vak?: string
    rsci?: string
  }
}
