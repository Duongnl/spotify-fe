import Image from "next/image"
import { Play, MoreHorizontal, Plus } from "lucide-react"

export default function PopularTracksList() {
  const tracks = [
    {
      id: 1,
      title: "Track 06",
      image: "/danhdoi.png",
      plays: "6,709,979",
      duration: "2:45",
      explicit: false,
    },
    {
      id: 2,
      title: "1000 Ánh Mắt",
      image: "/danhdoi.png",
      plays: "12,912,903",
      duration: "2:32",
      explicit: false,
    },
    {
      id: 3,
      title: "Hà Nội",
      image: "/danhdoi.png",
      plays: "30,482,129",
      duration: "2:45",
      explicit: false,
    },
    {
      id: 4,
      title: "Đánh Đổi",
      image: "/danhdoi.png",
      plays: "25,854,267",
      duration: "3:46",
      explicit: true,
    },
    {
      id: 5,
      title: "Buồn Hay Vui (feat. RPT MCK, Obito, Ronboogz & Boyzed)",
      image: "/danhdoi.png",
      plays: "27,702,850",
      duration: "4:51",
      explicit: false,
    },
  ]

  return (
    <div className="bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Popular</h2>

      <div className="space-y-2">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className={`flex items-center p-2 rounded-md group ${index === 0 ? "bg-[#2a2a2a]" : "hover:bg-[#2a2a2a]"}`}
          >
            <div className="w-8 text-center text-gray-400 group-hover:text-white">
              {index === 0 ? (
                <button className="h-8 w-8 text-white">
                  <Play size={16} className="ml-0.5" />
                </button>
              ) : (
                track.id
              )}
            </div>

            <div className="flex items-center ml-2">
              <Image
                src={track.image || "/placeholder.svg"}
                alt={track.title}
                width={40}
                height={40}
                className="rounded"
              />
            </div>

            <div className="ml-3 flex-grow">
              <div className="flex items-center">
                <span className="font-medium">{track.title}</span>
                {track.explicit && <span className="ml-2 px-1 text-xs bg-gray-600 text-white rounded">E</span>}
              </div>
            </div>

            <div className="text-gray-400 text-sm mr-4">{track.plays}</div>

            <div className="flex items-center gap-2">
              <button className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100">
                <Plus size={16} />
              </button>

              <div className="text-gray-400 text-sm w-10">{track.duration}</div>

              <button className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="text-gray-400 hover:text-white mt-4 px-0">
        See more
      </button>
    </div>
  )
}

