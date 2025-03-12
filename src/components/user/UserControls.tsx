"use client"

import { MoreHorizontal } from "lucide-react"

export default function ArtistControls() {
  return (
    <div className="flex items-center gap-4 p-6 bg-[#0e0e0e] w-full">
      <button
        className="flex items-center justify-center px-5  ml-4 py-2 bg-transparent border border-gray-200 rounded-3xl text-gray-200  hover:text-white hover:border-gray-100 transition-all transform hover:scale-105"
      >
        Follow
      </button>

      <button
        className="flex items-center justify-center w-10 h-10 bg-transparent text-gray-400 hover:text-white transition-all transform hover:scale-105"
        aria-label="More options"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
  )
}

