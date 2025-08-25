'use client'

import { useState } from 'react'
import TimelineCard from './TimelineCard'
import FadeContent from './FadeContent' // Import FadeContent
import { NASAImage } from '@/types/nasa'
import { formatDate } from '@/utils/nasaApi'

interface TimelineProps {
  images: NASAImage[]
  totalHits: number
  selectedDate: string
  searchQuery?: string
}

export default function Timeline({ images, totalHits, selectedDate, searchQuery }: TimelineProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 text-gray-600">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-300 mb-2">
          {searchQuery ? 'No Images Found' : 'No Images Found'}
        </h3>
        <p className="text-gray-500">
          {searchQuery 
            ? `No NASA images were found for "${searchQuery}". Try different keywords or browse by date.`
            : `No NASA images were found for ${formatDate(selectedDate)}. Try selecting a different date or use the search feature.`
          }
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          {totalHits} Image{totalHits !== 1 ? 's' : ''} Found
        </h2>
        <p className="text-gray-400">
          {searchQuery 
            ? `Results for: ${searchQuery}`
            : `Scroll through the timeline to explore space history from ${formatDate(selectedDate)}`
          }
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {images.map((image, index) => (
          <FadeContent key={image.href} delay={index * 100} duration={500} blur={false}>
            <TimelineCard
              image={image}
              isExpanded={expandedCard === image.href}
              onToggleExpanded={() => setExpandedCard(
                expandedCard === image.href ? null : image.href
              )}
            />
          </FadeContent>
        ))}
      </div>

      {totalHits > images.length && (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">
            Showing {images.length} of {totalHits} images
          </p>
          <p className="text-sm text-gray-500">
            More images may be available
          </p>
        </div>
      )}
    </div>
  )
}
