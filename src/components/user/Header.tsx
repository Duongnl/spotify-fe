"use client"
import Image from 'next/image';

interface HeaderProps {
  data: any;
}
export default function UserHeader(props: HeaderProps) {
  const { data } = props;
  console.log("data: ", data);

  const playlistCount = data.data.playlists?.lenght || 0;
  return (
    <div className="flex items-center bg-[#1a2a3a] text-white p-4 mt-4 ml-2 rounded-lg">

      <div className="flex flex-col md:flex-row  w-full mx-auto gap-6 items-center">
        <div className="relative w-60 h-60 shrink-0 flex items-center justify-center">
          <Image
            src={`https://res.cloudinary.com/moment-images/${data.data.imageUrl}`}
            alt="Album cover"
            fill
            className="object-cover rounded-full"
            priority
          />
        </div>


        <div className="flex flex-col justify-center">
          <div className="text-lg text-gray-300 mb-2">Profile</div>

          <h3 className="text-4xl font-bold tracking-tight mb-6">{data.data.name}</h3>

          <div className="flex items-center gap-3">
            

            <div className="flex items-center gap-2 text-gray-300">
            <span>{playlistCount} Public Playlist{playlistCount !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

