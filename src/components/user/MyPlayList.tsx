import Image from "next/image"
import { Play, Music } from "lucide-react"
import Link from "next/link"

interface Playlist {
  id: string
  title: string
  creator: string
  image?: string
  isPlaceholder?: boolean
}

export default function PublicPlaylists() {
  const playlists: Playlist[] = [
    {
      id: "3",
      title: "Danh sách phát của tôi #3",
      creator: "DuonggNl",
      isPlaceholder: true,
    },
    {
      id: "2",
      title: "Danh sách phát của tôi nè...",
      creator: "DuonggNl",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "1",
      title: "Danh sách phát của tôi #1",
      creator: "DuonggNl",
      isPlaceholder: true,
    },
  ]

  return (
    <div className="bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Public Playlists</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {playlists.map((playlist) => (
          <Link
            key={playlist.id}
            href="#"
            className="group relative bg-[#181818] rounded-md p-4 hover:bg-[#282828] transition-all duration-300"
          >
            <div className="relative aspect-square mb-4 rounded-md overflow-hidden">
              {playlist.isPlaceholder ? (
                <div className="w-full h-full bg-[#282828] flex items-center justify-center">
                  <Music className="w-1/2 h-1/2 text-[#4d4d4d]" />
                </div>
              ) : (
                <Image src={playlist.image || "/placeholder.svg"} alt={playlist.title} fill className="object-cover" />
              )}

              <button className="absolute right-2 bottom-2 w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                <Play className="w-6 h-6 text-black ml-1" />
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="font-medium line-clamp-2">{playlist.title}</h3>
              <p className="text-sm text-gray-400">By {playlist.creator}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

