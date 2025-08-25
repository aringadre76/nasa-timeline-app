import axios from 'axios'
import { NASAImageCollection, SearchParams, NASAImage } from '@/types/nasa'

const NASA_API_BASE = 'https://images-api.nasa.gov'

export const searchNASAImages = async (params: SearchParams): Promise<NASAImageCollection> => {
  try {
    const queryParams = new URLSearchParams()

    if (params.date) {
      const date = new Date(params.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      
      // Search for images specifically from the selected year
      queryParams.append('year_start', year.toString())
      queryParams.append('year_end', year.toString())
      
      // Add month-day keywords to get images from around the same date within that year
      const monthStr = String(month).padStart(2, '0')
      const dayStr = String(day).padStart(2, '0')
      queryParams.append('keywords', `${monthStr}-${dayStr}`)
    }

    if (params.keywords) {
      queryParams.append('keywords', params.keywords)
    }

    if (params.media_type) {
      queryParams.append('media_type', params.media_type)
    } else {
      queryParams.append('media_type', 'image')
    }

    const response = await axios.get(`${NASA_API_BASE}/search?${queryParams.toString()}`)
    let items = response.data.collection.items

    // If no results for the specific month-day, try searching just for the year
    if (items.length === 0 && params.date) {
      console.log('No results for specific month-day, trying year-only search...')
      const date = new Date(params.date)
      const year = date.getFullYear()
      
      const broaderResponse = await axios.get(`${NASA_API_BASE}/search?media_type=image&year_start=${year}&year_end=${year}`)
      items = broaderResponse.data.collection.items
    }

    const formattedItems: NASAImage[] = items.map((item: any) => ({
      href: item.href,
      data: item.data || [],
      links: item.links || []
    }))

    return {
      collection: {
        items: formattedItems,
        metadata: response.data.collection.metadata
      }
    }

  } catch (error) {
    console.error('Error fetching NASA images:', error)
    throw new Error('Failed to fetch NASA images')
  }
}

export const getRandomDate = (): string => {
  const startYear = 1958
  const endYear = new Date().getFullYear()
  const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear
  const month = Math.floor(Math.random() * 12) + 1
  const day = Math.floor(Math.random() * 28) + 1
  
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return 'Invalid date'
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Invalid date'
  }
}

export const getPopularKeywords = (): string[] => {
  return [
    'apollo', 'space shuttle', 'international space station', 'mars', 'saturn',
    'galaxy', 'nebula', 'earth', 'moon', 'solar system', 'astronaut',
    'rocket', 'satellite', 'telescope', 'rover', 'mission'
  ]
}
