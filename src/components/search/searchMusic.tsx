'use client'

import React from 'react'

const mockSongs = [
  {
    title: 'Tell the kids i love them',
    artist: 'Obito, Shiki',
    duration: '3:44',
    thumbnail: '/danhdoi.png',
  },
  {
    title: '1000 Ánh Mắt',
    artist: 'Shiki, Obito',
    duration: '2:32',
    thumbnail: '/danhdoi.png',
  },
  {
    title: 'Có Đôi Điều',
    artist: 'Shiki',
    duration: '2:54',
    thumbnail: '/danhdoi.png',
  },
  {
    title: 'Perfect',
    artist: 'Shiki, Tyronée',
    duration: '3:08',
    thumbnail: '/danhdoi.png',
  },
]

const mockArtists = [
  {
    name: 'Obito',
    image: '/danhdoi.png',
  },
  {
    name: 'Obito Radio',
    image: '/danhdoi.png',
  },
  {
    name: 'Thiên Hạ Nghe Gì',
    image: '/danhdoi.png',
  },
  {
    name: 'Top Nghệ Sĩ 2024 Việt Nam',
    image: '/danhdoi.png',
  },
]

export default function SearchPage() {
  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-6">Kết quả cho: "Tell the kids i love them"</h2>

      {/* Kết quả hàng đầu + Bài hát */}
      <div className="flex flex-col md:flex-row md:items-stretch gap-6 mb-10">
        {/* Kết quả hàng đầu - 5/12 */}
        <div className="md:w-5/12 h-full">
          <h3 className="text-xl font-semibold mb-2">Kết quả hàng đầu</h3>
          <div className="flex items-center bg-gray-800 p-4 rounded-lg h-full">
            <img
              src={mockSongs[0].thumbnail}
              alt="Top song"
              className="w-24 h-24 rounded mr-4"
            />
            <div>
              <p className="text-lg font-bold">{mockSongs[0].title}</p>
              <p className="text-sm text-gray-300">Bài hát • {mockSongs[0].artist}</p>
            </div>
          </div>
        </div>

        {/* Danh sách bài hát - 7/12 */}
        <div className="md:w-7/12 h-full">
          <h3 className="text-xl font-semibold mb-2">Bài hát</h3>
          <ul>
            {mockSongs.map((song, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center py-2 border-b border-gray-700"
              >
                <div className="flex items-center">
                  <img
                    src={song.thumbnail}
                    className="w-10 h-10 mr-3 rounded"
                    alt={song.title}
                  />
                  <div>
                    <p className="text-base font-medium text-green-400 hover:underline cursor-pointer">
                      {song.title}
                    </p>
                    <p className="text-sm text-gray-400">{song.artist}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{song.duration}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Có sự xuất hiện của */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Có sự xuất hiện của</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockArtists.map((artist, idx) => (
            <div key={idx} className="bg-gray-800 p-4 rounded-lg text-center">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <p className="text-sm">{artist.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
