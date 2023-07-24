export interface IArticle {
  title: string
  authors: string
  abstract: string
  published_journal: string
  published_year: number
  published_volume: number
  published_number: number
  pages: string
  cite: string
  is_russian: boolean
  is_conference: boolean
  links: {
    pdf: string
    wos: string
    scopus: string
    doi: string
    rinc: string
    vak: string
    rsci: string
  }
}
