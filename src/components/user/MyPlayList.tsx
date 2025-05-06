import Image from "next/image"
import { Play, Music } from "lucide-react"
import Link from "next/link"

interface Playlist {
  data: any;
}

export default function PublicPlaylists(props: Playlist) {
  const { data } = props;
  const playlists = data.data.playlists;
  const userName = data.data.name;
  return (
    <div className="bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Public Playlists</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {playlists.map((playlist) => (
          <Link
            key={playlist.id}
            href={`/playlists/${playlist.id}`} // Thay # bằng đường dẫn thực tế
            className="group relative bg-[#181818] rounded-md p-4 hover:bg-[#282828] transition-all duration-300"
          >
            <div className="relative aspect-square mb-4 rounded-md overflow-hidden">
              {/* Sử dụng placeholder nếu không có ảnh */}
              {!playlist.imageUrl ? (
                <div className="w-full h-full bg-[#282828] flex items-center justify-center">
                  <Music className="w-1/2 h-1/2 text-[#4d4d4d]" />
                </div>
              ) : (
                <Image 
                  src={playlist.imageUrl || "/placeholder.svg"} 
                  alt={playlist.name} 
                  fill 
                  className="object-cover" 
                />
              )}

              <button className="absolute right-2 bottom-2 w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                <Play className="w-6 h-6 text-black ml-1" />
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="font-medium line-clamp-2">{playlist.name}</h3>
              <p className="text-sm text-gray-400">By {userName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

