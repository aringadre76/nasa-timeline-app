'use client'

import { useState } from 'react'
import Image from 'next/image'
import { NASAImage } from '@/types/nasa'
import { formatDate } from '@/utils/nasaApi'

interface TimelineCardProps {
  image: NASAImage
  isExpanded: boolean
  onToggleExpanded: () => void
}

export default function TimelineCard({ image, isExpanded, onToggleExpanded }: TimelineCardProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const getImageUrl = (image: NASAImage): string => {
    if (image.links && Array.isArray(image.links) && image.links.length > 0) {
      const imageLink = image.links.find(link => link.render === 'image')
      if (imageLink) {
        return imageLink.href
      }
    }
    return image.href // Fallback to href if no specific image link is found
  }

  const truncateText = (text: string | undefined, maxLength: number): string => {
    if (!text || typeof text !== 'string') return 'No description available'
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
  }

  const formatKeywords = (keywords: string[] | undefined): string => {
    if (!keywords || keywords.length === 0) return 'No keywords available'
    return keywords.slice(0, 5).join(', ')
  }

  const imageData = image.data && image.data.length > 0 ? image.data[0] : {}
  const safeTitle = imageData.title || 'Untitled Image'
  const safeDescription = imageData.description || imageData.description_508 || 'No description available'
  const safeKeywords = imageData.keywords || []
  const safeCenter = imageData.center || 'Unknown Center'
  const safePhotographer = imageData.photographer || 'Unknown'
  const safeLocation = imageData.location || 'Unknown Location'

  return (
    <div className="timeline-card">
      <div className="relative">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-t-lg" />
        )}
        
        {!imageError ? (
          <Image
            src={getImageUrl(image)}
            alt={safeTitle}
            width={800}
            height={600}
            className={`w-full h-64 object-cover transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true)
              setImageLoading(false)
            }}
          />
        ) : (
          <div className="w-full h-64 bg-gray-700 flex items-center justify-center rounded-t-lg">
            <div className="text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Image unavailable</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-white leading-tight">
            {safeTitle}
          </h3>
          <button
            onClick={onToggleExpanded}
            className="text-space-400 hover:text-space-300 transition-colors duration-200 ml-4"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-400">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {imageData.date_created ? formatDate(imageData.date_created) : 'Date unknown'}
          </div>

          {safeCenter && (
            <div className="flex items-center text-sm text-gray-400">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {safeCenter}
            </div>
          )}

          {safePhotographer && (
            <div className="flex items-center text-sm text-gray-400">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {safePhotographer}
            </div>
          )}

          <div className="pt-2">
            <p className="text-gray-300 leading-relaxed">
              {isExpanded 
                ? safeDescription
                : truncateText(safeDescription, 150)
              }
            </p>
          </div>

          {isExpanded && (
            <div className="pt-4 border-t border-gray-700">
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-400 mr-2">Keywords:</span>
                  <span className="text-sm text-gray-300">
                    {formatKeywords(safeKeywords)}
                  </span>
                </div>
                
                {safeLocation && (
                  <div className="flex items-start">
                    <span className="text-sm font-medium text-gray-400 mr-2">Location:</span>
                    <span className="text-sm text-gray-300">{safeLocation}</span>
                  </div>
                )}

                <div className="pt-3">
                  <a
                    href={image.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-space-400 hover:text-space-300 transition-colors duration-200"
                  >
                    <span className="text-sm">View on NASA Images</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
