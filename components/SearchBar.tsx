'use client'

import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for space missions, planets, astronauts..."
          className="flex-1 date-picker"
        />
        <button
          type="submit"
          disabled={!searchQuery.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </div>
    </form>
  )
}
