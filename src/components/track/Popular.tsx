import Image from "next/image"
import { ChevronRight } from "lucide-react"

interface Track {
  number: number
  title: string
  views: number
  duration: string
  explicit?: boolean
  albumArt: string
  featuring?: string[]
}

export default function PopularTracks() {
  const tracks: Track[] = [
    {
      number: 1,
      title: "Track 06",
      views: 6709979,
      duration: "2:45",
      albumArt: "/danhdoi.png",
    },
    {
      number: 2,
      title: "1000 Ánh Mắt",
      views: 12912903,
      duration: "2:32",
      albumArt: "/danhdoi.png",
    },
    {
      number: 3,
      title: "Hà Nội",
      views: 30482129,
      duration: "2:45",
      albumArt: "/danhdoi.png",
    },
    {
      number: 4,
      title: "Đánh Đổi",
      views: 25854267,
      duration: "3:46",
      explicit: true,
      albumArt: "/danhdoi.png",
    },
    {
      number: 5,
      title: "Buồn Hay Vui",
      views: 27702850,
      duration: "4:51",
      albumArt: "/danhdoi.png",
      featuring: ["RPT MCK", "Obito", "Ronboogz", "Boyzed"],
    },
  ]

  const formatViews = (views: number) => {
    return new Intl.NumberFormat("en-US").format(views)
  }

  return (
    <div className="bg-[#121212] text-white p-6">
      <div className="mb-6">
        <p className="text-sm text-gray-400">Popular Tracks by</p>
        <h2 className="text-3xl font-bold">Obito</h2>
      </div>

      <div className="space-y-3">
        {tracks.map((track) => (
          <div
            key={track.number}
            className="flex items-center gap-4 p-2 rounded-md hover:bg-white/10 transition-colors group cursor-pointer"
          >
            <div className="w-5 text-gray-400 text-sm text-right">{track.number}</div>

            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={track.albumArt || "/danhdoi.png"}
                alt={`${track.title} album art`}
                width={48}
                height={48}
                className="rounded object-cover"
              />
            </div>

            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold truncate">{track.title}</span>
                {track.explicit && <span className="bg-gray-600 text-[10px] px-1 rounded">E</span>}
              </div>
              {track.featuring && (
                <div className="text-sm text-gray-400 truncate">{`(feat. ${track.featuring.join(", ")})`}</div>
              )}
            </div>

            <div className="text-sm text-gray-400 mx-4 mr-20">{formatViews(track.views)}</div>

            <div className="text-sm text-gray-400 w-12 text-right">{track.duration}</div>
          </div>
        ))}
      </div>

      <button className="flex items-center gap-2 text-gray-400 hover:text-white mt-4 text-sm font-medium">
        See more
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

