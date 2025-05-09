import Image from "next/image"
import { Play, Heart, Plus } from "lucide-react"
import Link from "next/link";
interface Track {
  id: string;
  title: string;
  duration: number;
  track_file: string;
  image_file: string;
  playCount: number;
  artistName?: string;
  artistImage?: string;
}

interface PopularProps {
  tracks: Track[];
  currentArtist?: {
    name: string;
    image_file: string;
  };
}

export default function PopularSong({ tracks, currentArtist }: PopularProps) {
  // Format duration từ giây sang phút:giây
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Format số lượt nghe
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="bg-[#121212] text-white p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Popular Songs</h2>
      </div>
      
      {tracks.length > 0 ? (
        <div className="space-y-3">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center gap-4 p-2 rounded-md hover:bg-white/10 transition-colors group cursor-pointer"
            >
              <div className="relative w-12 h-12 flex-shrink-0">
                <div className="relative w-12 h-12">
                  <Image
                   src={`https://res.cloudinary.com/moment-images/${track.image_file}`}
                    alt={`${track.title} album art`}
                    width={48}
                    height={48}
                    className="rounded object-cover"
                  />
                </div>
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <Link href={`/track/${track.id}`}
                  className="font-semibold truncate">{track.title}</Link>
                </div>
                <div className="text-sm text-gray-400 truncate">
                  {track.artistName}
                </div>
              </div>

              <div className="text-sm text-gray-400 mx-4 mr-20">
                {formatViews(track.playCount)}
              </div>

              <div className="hidden sm:flex items-center gap-2">
                

                <div className="text-gray-400 text-sm w-10">
                  {formatDuration(track.duration)}
                </div>

              
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No other songs available for this artist.</p>
      )}
    </div>
  );
}