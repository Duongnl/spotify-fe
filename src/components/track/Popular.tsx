import Image from "next/image"
import { Play, Heart, Plus } from "lucide-react"
interface Song {
  title: string
  artists: string[]
  views: number
  duration: string
  explicit?: boolean
  albumArt: string
}

export default function PopularSong() {
  const songs: Song[] = [
    {
      title: "Simp Gái 808",
      artists: ["Low G"],
      views: 31019828,
      duration: "2:41",
      explicit: true,
      albumArt: "/danhdoi.png",
    },
    {
      title: "Mơ",
      artists: ["Vũ Cát Tường"],
      views: 26208842,
      duration: "4:22",
      albumArt: "/danhdoi.png",
    },
    {
      title: "Don't Côi",
      artists: ["RPT Orijinn", "Ronboogz"],
      views: 37702988,
      duration: "2:28",
      explicit: true,
      albumArt: "/danhdoi.png",
    },
    {
      title: "Chịu Cách Mình Nói Thua",
      artists: ["RHYDER", "CoolKid", "BAN"],
      views: 41889361,
      duration: "3:01",
      albumArt: "/danhdoi.png",
    },
    {
      title: "NGỰA Ô",
      artists: ["Dangrangto", "TeuYungBoy", "DONAL"],
      views: 15487312,
      duration: "3:35",
      albumArt: "/danhdoi.png",
    },
  ]

  const formatViews = (views: number) => {
    return new Intl.NumberFormat("en-US").format(views)
  }

  return (
    <div className="bg-[#121212] text-white p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Popular Song</h2>
        <p className="text-sm text-gray-400">by Obito</p>
      </div>
      <div className="space-y-3">
        {songs.map((song, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-2 rounded-md hover:bg-white/10 transition-colors group cursor-pointer"
          >
            <div className="relative w-12 h-12 flex-shrink-0">
              <div className="relative w-12 h-12">
                {/* Ảnh bìa */}
                <Image
                  src={song.albumArt || "/placeholder.svg"}
                  alt={`${song.title} album art`}
                  width={48}
                  height={48}
                  className="rounded object-cover"
                />

                {/* Nút Play - Ẩn mặc định, hiển thị khi hover */}
                <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={20} className="text-white" />
                </button>
              </div>

            </div>

            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold truncate">{song.title}</span>
                {song.explicit && <span className="bg-gray-600 text-[10px] px-1 rounded">E</span>}
              </div>
              <div className="text-sm text-gray-400 truncate">{song.artists.join(", ")}</div>
            </div>

            <div className="text-sm text-gray-400 mx-4 mr-20">{formatViews(song.views)}</div>

            <div className="hidden sm:flex items-center gap-2">
              <button className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100">
                <Plus size={16} />
              </button>

              <div className="text-gray-400 text-sm w-10">{song.duration}</div>

              <button className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100">
                <Heart size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

