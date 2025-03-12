"use client"

import { Play, Plus, MoreHorizontal } from "lucide-react"

export default function MediaControls() {
  return (
    <div className="flex items-center gap-4 p-6 bg-[#0e0e0e] w-full">
      <button
        className="flex items-center justify-center w-14 h-14 bg-[#00e676] rounded-full text-black hover:bg-[#00c853] transition-colors ml-4"
        aria-label="Play"
      >
        <Play className="w-7 h-7 fill-current" />
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
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
  )
}

