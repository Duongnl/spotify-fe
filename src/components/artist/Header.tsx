import Image from "next/image"
import { CheckCircle } from "lucide-react"

export default function ArtistProfile() {
  return (
    <div className="relative w-full h-[320px] bg-black overflow-hidden">
      {/* Artist image on the right */}
      <div className="absolute right-0 top-0 h-full w-1/2">
        <Image
          src="/obito.png"
          alt="Artist profile image"
          fill
          className="object-cover object-right"
          priority
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 p-8 flex flex-col justify-end h-full">
        {/* Verified badge */}
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-blue-400 fill-blue-400" />
          <span className="text-white text-sm">Verified Artist</span>
        </div>

        {/* Artist name */}
        <h1 className="text-white text-7xl font-bold mb-4">Obito</h1>

        {/* Monthly listeners */}
        <p className="text-white text-lg">1,529,381 monthly listeners</p>
      </div>
    </div>
  )
}

