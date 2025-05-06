'use client'
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Play, Heart, Plus, Pause } from "lucide-react"

interface PopularTracksListProps {
  data: any;
}

export default function PopularTracksList(props: PopularTracksListProps) {
  const { data } = props;
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup audio element when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlayToggle = (trackId: string, trackFile: string) => {
    // If clicking on the currently playing track
    if (currentlyPlaying === trackId) {
      if (isPlaying) {
        // Pause the current track
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        // Resume the current track
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      // Play a new track
      
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Create new audio element
      const audio = new Audio(`https://res.cloudinary.com/moment-images/${trackFile}`);
      audioRef.current = audio;
      
      // Set up ended event to reset state
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentlyPlaying(null);
      });
      
      // Play the new track
      audio.play().then(() => {
        setIsPlaying(true);
        setCurrentlyPlaying(trackId);
      }).catch(error => {
        console.error("Error playing audio:", error);
      });
    }
  };

  console.log("PopularTracksList data: ", data);

  return (
    <div className="bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Popular</h2>
  
      <div className="space-y-2">
        {data.data.tracks.map((item, index) => {
          const isCurrentTrack = currentlyPlaying === item.track.id;
          
          return (
            <div
              key={item.id}
              className="flex items-center p-2 rounded-md group hover:bg-[#2a2a2a]"
            >
              <div className="w-8 text-center text-gray-400 group-hover:text-white">
                {/* Hiển thị số thứ tự, ẩn khi hover */}
                <span className="group-hover:hidden">{index + 1}</span>
    
                {/* Hiển thị nút Play khi hover */}
                <button 
                  className="h-8 w-8 text-white hidden group-hover:flex items-center justify-center"
                  onClick={() => handlePlayToggle(item.track.id, item.track.track_file)}
                >
                  {isCurrentTrack && isPlaying ? (
                    <Pause size={16} />
                  ) : (
                    <Play size={16} className="ml-0.5" />
                  )}
                  
                </button>
              </div>
    
              <div className="flex items-center ml-2">
                <Image
                  src={`https://res.cloudinary.com/moment-images/${item.track.image_file}`}
                  alt={item.track.title}
                  width={40}
                  height={40}
                  className="rounded"
                />
              </div>
    
              <div className="ml-3 flex-grow">
                <div className="flex items-center">
                  <span 
                    className={`font-medium block truncate max-w-[100px] sm:max-w-none ${
                      isCurrentTrack && isPlaying ? "text-[#00c853]" : ""
                    }`}
                  >
                    {item.track.title}
                  </span>
                </div>
              </div>
    
              <div className="text-gray-400 text-sm mr-4">{item.track.playCount}</div>
    
              {/* Ẩn Plus/Pause và Heart trên mobile */}
              <div className="hidden sm:flex items-center gap-2">
                <button 
                  className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100"
                  onClick={() => handlePlayToggle(item.track.id, item.track.track_file)}
                >
                  
                  
                </button>
    
                <div className="text-gray-400 text-sm w-10">
                  {Math.floor(item.track.duration / 60)}:
                  {(item.track.duration % 60).toString().padStart(2, '0')}
                </div>
    
                <button className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100">
                  
                </button>
              </div>
            </div>
          );
        })}
      </div>
  
      <button className="text-gray-400 hover:text-white mt-4 px-0">
        See more
      </button>
    </div>
  );
}