"use client";
import { useRef, useState } from "react";
import { Play, Pause, Plus, Heart } from "lucide-react";

interface TrackMediaProps {
  data: any;
}

export default function MediaControls(props: TrackMediaProps) {
  const { data } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-4 p-6 bg-[#0e0e0e] w-full">
      <button
        onClick={handleTogglePlay}
        className="flex items-center justify-center w-14 h-14 bg-[#00e676] rounded-full text-black hover:bg-[#00c853] transition-colors ml-4"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-7 h-7 fill-current" />
        ) : (
          <Play className="w-7 h-7 fill-current" />
        )}
      </button>

      <button
        className="flex items-center justify-center w-10 h-10 bg-transparent border border-gray-600 rounded-full text-gray-400 hover:text-white hover:border-gray-400 transition-colors"
        aria-label="Add"
      >
        <Plus className="w-5 h-5" />
      </button>

      <button
        className="flex items-center justify-center w-10 h-10 bg-transparent text-gray-400 hover:text-white transition-colors"
        aria-label="More options"
      >
        <Heart className="w-8 h-8" />
      </button>

      {/* Audio Element */}
      <audio ref={audioRef} src={`https://res.cloudinary.com/moment-images/${data.data.track_file}`} />
    </div>
  );
}
