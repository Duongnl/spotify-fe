'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const mockData = [
  { type: 'song', name: 'Tell the kids i love them', artist: 'Obito, Shiki' },
  { type: 'song', name: 'Timeless', artist: 'The Weeknd, Playboi Carti' },
  { type: 'song', name: 'PHONG ZIN ZIN', artist: 'tlinh, Low G' },
  { type: 'song', name: 'Tell Ur Mom II', artist: 'Winno, Hustlang Heily' },
]

const categories = [
  { label: 'Nhạc', color: 'bg-pink-600', image: '/danhdoi.png' },
  { label: 'Podcasts', color: 'bg-emerald-700', image: '/danhdoi.png' },
  { label: 'Sự kiện trực tiếp', color: 'bg-purple-600', image: '/danhdoi.png' },
  { label: 'Dành Cho Bạn', color: 'bg-blue-900', image: '/images/for-you.jpg' },
  { label: 'Mới phát hành', color: 'bg-lime-600', image: '/images/new.jpg' },
  { label: 'Nhạc Việt', color: 'bg-sky-700', image: '/images/vpop.jpg' },
  { label: 'Pop', color: 'bg-sky-600', image: '/images/pop.jpg' },
  { label: 'K-Pop', color: 'bg-red-600', image: '/images/kpop.jpg' },
  { label: 'Hip-Hop', color: 'bg-orange-700', image: '/images/hiphop.jpg' },
]

const SearchPage = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof mockData>([])

  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
    } else {
      const filtered = mockData.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.artist.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    }
  }, [query])

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Bạn muốn phát nội dung gì?"
        className="w-full px-4 py-2 rounded-full bg-zinc-800 text-white placeholder-gray-400 focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className={`relative p-4 rounded-lg ${cat.color} text-white font-bold text-lg overflow-hidden aspect-[2/1]`}
            >
              <span className="z-10 relative">{cat.label}</span>
              <Image
                src={cat.image}
                alt={cat.label}
                width={100}
                height={100}
                className="absolute bottom-2 right-2 rotate-12 rounded-md object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-white mb-4">Kết quả tìm kiếm:</h2>
          <ul className="space-y-2">
            {results.map((item, idx) => (
              <li key={idx} className="text-white bg-zinc-800 px-4 py-2 rounded-lg">
                🎵 {item.name} — <span className="text-gray-300">{item.artist}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchPage
