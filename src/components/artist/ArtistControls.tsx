"use client"

import { Play, Plus, Heart } from "lucide-react"

export default function ArtistControls() {
  return (
    <div className="flex items-center gap-4 p-6 bg-[#0e0e0e] w-full">
      <button
        className="flex items-center justify-center w-14 h-14 bg-[#00e676] rounded-full text-black hover:bg-[#00c853] ml-4 transition-all transform hover:scale-105"
        aria-label="Play"
      >
        <Play className="w-7 h-7 fill-current" />
      </button>

      <button
        className="flex items-center justify-center px-5  py-2 bg-transparent border border-gray-200 rounded-3xl text-gray-200  hover:text-white hover:border-gray-100 transition-all transform hover:scale-105"
      >
        Follow
      </button>

    </div>
  )
}

