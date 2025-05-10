"use client";

import Image from "next/image";
import { formatDuration } from "@/utils/format";
import Link from "next/link";

// Định nghĩa interface cho Artist
interface Artist {
  id: string;
  name: string;
}

// Định nghĩa interface cho ArtistItem trong mảng artists
interface ArtistItem {
  owner: boolean;
  artist: Artist;
}

// Định nghĩa interface cho TrackHeaderData
interface TrackHeaderData {
  image_file: string;
  title: string;
  artists: ArtistItem[];
  releaseDate: string;
  duration: number;
  playCount: number;
}

// Định nghĩa interface cho Props
interface TrackHeaderProps {
  data: {
    data: TrackHeaderData;
  };
}

export default function TrackHeader(props: TrackHeaderProps) {
  const { data } = props;
  console.log(data);

  return (
    <div className="flex items-center bg-[#1a2a3a] text-white p-4 mt-4 ml-4 rounded-lg">
      <div className="flex flex-col md:flex-row w-full mx-auto gap-6">
        <div className="relative w-full md:w-80 h-60 shrink-0">
          <Image
            src={`https://res.cloudinary.com/moment-images/${data.data.image_file}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Album cover"
            fill
            className="object-cover rounded-md"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-sm text-gray-300 mb-2">Song</div>

          <h1 className="text-7xl font-bold tracking-tight mb-6">{data.data.title}</h1>

          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-700">
              <Image
                src={`https://res.cloudinary.com/moment-images/${data.data.image_file}`}
                alt="Artist avatar"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              {data.data.artists
                .filter((item: ArtistItem) => item.owner === true)
                .map((item: ArtistItem, index: number, array: ArtistItem[]) => (
                  <span key={index}>
                    <Link
                      href={`/artist/${item.artist.id}`}
                      className="no-underline hover:underline"
                    >
                      {item.artist.name}
                    </Link>
                    {index < array.length - 1 && " - "}
                  </span>
                ))}

              <span className="text-gray-400">•</span>
              <span>{data.data.releaseDate}</span>
              <span className="text-gray-400">•</span>
              <span>{formatDuration(data.data.duration)}</span>
              <span className="text-gray-400">•</span>
              <span>{data.data.playCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}