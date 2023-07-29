import dynamic from 'next/dynamic'

const ArticleForm = dynamic(() => import('@/components/Article/ArticleForm'), {
  loading: () => <p>Loading...</p>,
})
export default function Home() {
  return (
    <>
      <h1>Home page</h1>
      <ArticleForm />
    </>
  )
}
