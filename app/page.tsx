'use client'

import { QueryClient, QueryClientProvider } from 'react-query'
import TimelineApp from '@/components/TimelineApp'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <TimelineApp />
    </QueryClientProvider>
  )
}
