import { Search } from '@/features/search'

interface SearchPageProps {
  params: Promise<{ key: string }>
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { key } = await params
  return <Search searchKey={key} />
}
