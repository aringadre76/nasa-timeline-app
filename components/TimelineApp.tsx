'use client'

import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import Header from './Header'
import DatePicker from './DatePicker'
import SearchBar from './SearchBar'
import Timeline from './Timeline'
import LoadingSpinner from './LoadingSpinner'
import ScrollReveal from './ScrollReveal' // Import ScrollReveal
import { searchNASAImages, getRandomDate, formatDate, getPopularKeywords } from '@/utils/nasaApi'
import { SearchParams } from '@/types/nasa'

export default function TimelineApp() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [searchParams, setSearchParams] = useState<SearchParams>({
    date: selectedDate,
    media_type: 'image'
  })
  const [showSearch, setShowSearch] = useState(false)

  const { data, isLoading, error, refetch } = useQuery(
    ['nasa-images', searchParams],
    () => searchNASAImages(searchParams),
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      retry: 2,
      retryDelay: 1000
    }
  )

  useEffect(() => {
    setSearchParams(prev => ({ ...prev, date: selectedDate }))
  }, [selectedDate])

  const handleDateChange = (date: string) => {
    if (date && date !== selectedDate) {
      setSelectedDate(date)
      setSearchParams(prev => ({ ...prev, date, keywords: undefined }))
    }
  }

  const handleRandomDate = () => {
    const randomDate = getRandomDate()
    setSelectedDate(randomDate)
    setSearchParams(prev => ({ ...prev, date: randomDate, keywords: undefined }))
  }

  const handleSearch = (keywords: string) => {
    if (keywords.trim()) {
      setSearchParams(prev => ({ ...prev, keywords: keywords.trim() }))
      setShowSearch(false)
    }
  }

  const handleClearSearch = () => {
    setSearchParams(prev => ({ ...prev, keywords: undefined }))
  }

  const handlePopularKeyword = (keyword: string) => {
    if (keyword) {
      setSearchParams(prev => ({ ...prev, keywords: keyword, date: undefined }))
      setShowSearch(false)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Images</h1>
          <p className="text-gray-400 mb-4">Failed to fetch NASA images. Please try again.</p>
          <button 
            onClick={() => refetch()}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const hasResults = (data?.collection?.metadata?.total_hits || 0) > 0
  const popularKeywords = getPopularKeywords()
  const safeSelectedDate = selectedDate || new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <ScrollReveal blurStrength={5} baseRotation={3}>
            <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-space-400 to-blue-400 bg-clip-text text-transparent">
              This Day in Space
            </h1>
            <p className="text-center text-gray-400 mb-6">
                      {searchParams.keywords
                        ? `Searching for: ${searchParams.keywords}`
                        : `Explore NASA's historical images from ${new Date(safeSelectedDate).getFullYear()}`
                      }
                    </p>
          </ScrollReveal>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <DatePicker 
              selectedDate={safeSelectedDate}
              onDateChange={handleDateChange}
            />
            <button 
              onClick={handleRandomDate}
              className="btn-secondary"
            >
              Random Day
            </button>
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="btn-primary"
            >
              {showSearch ? 'Hide Search' : 'Search Images'}
            </button>
          </div>

          {showSearch && (
            <div className="max-w-2xl mx-auto mb-6">
              <SearchBar onSearch={handleSearch} />
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {popularKeywords.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => handlePopularKeyword(keyword)}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-full transition-colors duration-200"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {searchParams.keywords && (
            <div className="text-center mb-6">
              <button 
                onClick={handleClearSearch}
                className="btn-secondary text-sm"
              >
                Clear Search & Return to Date View
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Timeline 
            images={data?.collection?.items || []}
            totalHits={data?.collection?.metadata?.total_hits || 0}
            selectedDate={safeSelectedDate}
            searchQuery={searchParams.keywords}
          />
        )}
      </main>
    </div>
  )
}
