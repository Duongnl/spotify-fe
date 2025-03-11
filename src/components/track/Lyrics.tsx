"use client"

import { useState } from "react"
import Image from "next/image"

export default function LyricsPage() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-[#121212] text-white min-h-screen">
      {/* Lyrics Section */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Lyrics</h1>

        <div className="space-y-2 text-gray-300 text-lg">
          <p>If I had ten thousand tongues I couldn't tell all that</p>
          <p>the Lord has done for me</p>
          <p>So I'll keep on singing, praise</p>
          <p>Yeah</p>
          <p>It's hard to say but I gotta tell the truth</p>
          <p>To-, ah</p>
          <p>Tao đánh đổi màn đêm yên giấc viết những bài nhạc</p>
          <p>hay nhất cuộc đời (ah)</p>
          <p>Dị sân là nguồn cảm hứng, fan theo rầm rập nhạc</p>
          <p>tao thuộc lời (ah)</p>
          <p>Trên bàn tiệc của tiền và quỷ, tao là thằng duy nhất</p>
          <p>được mời (yeah, whoa)</p>

          {expanded && (
            <>
              <p>Additional lyrics would appear here when expanded</p>
              <p>More lyrics line 1</p>
              <p>More lyrics line 2</p>
              <p>More lyrics line 3</p>
            </>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-gray-400 hover:text-white mt-2"
          >
            ...Show {expanded ? "less" : "more"}
          </button>
        </div>
      </div>

      {/* Artists Section */}
      <div className="md:w-80">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="/danhdoi.png"
                alt="Obito"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Artist</p>
              <p className="text-xl font-semibold">Obito</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="/danhdoi.png"
                alt="Shiki"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Artist</p>
              <p className="text-xl font-semibold">Shiki</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="/danhdoi.png"
                alt="RPT MCK"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Artist</p>
              <p className="text-xl font-semibold">RPT MCK</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

