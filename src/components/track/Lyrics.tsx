"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Định nghĩa interface cho Artist
interface Artist {
  name: string;
  image_file: string;
  id: string;
}

// Định nghĩa interface cho Item trong mảng artists
interface ArtistItem {
  artist: Artist;
}

// Định nghĩa interface cho Data
interface TrackLyricData {
  lyrics?: string;
  artists: ArtistItem[];
}

// Định nghĩa interface cho Props
interface TrackLyricProps {
  data: {
    data: TrackLyricData;
  };
}

export default function LyricsPage(props: TrackLyricProps) {
  const { data } = props;
  const [expanded, setExpanded] = useState(false);

  const lines: string[] = data.data.lyrics?.split("\n") || [];
  const visibleLines = expanded ? lines : lines.slice(0, 10);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-[#121212] text-white">
      {/* Lyrics Section */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Lyrics</h1>

        <div className="space-y-2 text-gray-300 text-lg">
          {visibleLines.map((line: string, index: number) => (
            <p key={index}>{line}</p>
          ))}

          {lines.length > 10 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center text-gray-400 hover:text-white mt-2"
            >
              ...Show {expanded ? "less" : "more"}
            </button>
          )}
        </div>
      </div>

      {/* Artists Section */}
      <div className="md:w-80">
        <div className="space-y-6">
          {data.data.artists.map((item: ArtistItem, index: number) => (
            <div key={index} className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={`https://res.cloudinary.com/moment-images/${item.artist.image_file}`}
                  alt={item.artist.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Artist</p>
                <Link href={`/artist/${item.artist.id}`}>
                <p className="text-xl font-semibold">{item.artist.name}</p>
                </Link>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}