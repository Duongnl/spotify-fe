import Image from "next/image"
import { Play } from "lucide-react"
import Link from "next/link"

interface Artist {
  id: string
  name: string
  image: string
  type: string
}

export default function FollowingSection() {
  const artists: Artist[] = [
    {
      id: "1",
      name: "Shiki",
      image: "/placeholder.svg?height=200&width=200",
      type: "Artist",
    },
  ]

  return (
    <div className="bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Following</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
        {artists.map((artist) => (
          <Link
            key={artist.id}
            href="#"
            className="group bg-[#181818] rounded-lg p-4 hover:bg-[#282828] transition-all duration-300"
          >
            <div className="relative aspect-square mb-4">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
              </div>

              <button
                className="absolute right-0 bottom-0 w-10 h-10 bg-[#1ed760] rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                aria-label={`Play ${artist.name}'s music`}
              >
                <Play className="w-5 h-5 text-black ml-0.5" />
              </button>
            </div>

            <div className="text-center">
              <h3 className="font-medium truncate">{artist.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{artist.type}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

