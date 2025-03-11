"use client"

import Image from "next/image"
import { ChevronRight } from "lucide-react"

interface Release {
  title: string
  year: number
  type: "Album" | "Single"
  artwork: string
  featuring?: string
}

export default function PopularReleases() {
  const releases: Release[] = [
    {
      title: "Đánh Đổi",
      year: 2023,
      type: "Album",
      artwork: "/danhdoi.png",
    },
    {
      title: "Simple Love",
      year: 2022,
      type: "Single",
      artwork: "/danhdoi.png",
    },
    {
      title: "Shay nắnggg",
      year: 2022,
      type: "Single",
      artwork: "/danhdoi.png",
    },
    {
      title: "Phong Long",
      year: 2024,
      type: "Single",
      artwork: "/danhdoi.png",
    },
    {
      title: "When You Look at Me",
      year: 2024,
      type: "Single",
      artwork: "/danhdoi.png",
      featuring: "Seachains",
    },
    {
      title: "Si me you",
      year: 2022,
      type: "Single",
      artwork: "/danhdoi.png",
    },
    {
        title: "Si me you",
        year: 2022,
        type: "Single",
        artwork: "/danhdoi.png",
      },
      {
        title: "Si me you",
        year: 2022,
        type: "Single",
        artwork: "/danhdoi.png",
      },
      {
        title: "Si me you",
        year: 2022,
        type: "Single",
        artwork: "/danhdoi.png",
      },
  ]

  return (
    <div className="bg-[#121212] text-white p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">Popular Releases by Obito</h2>
      <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
        Show all
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  
    <div className="w-full pb-4">
      <div className="flex flex-wrap gap-6">
        {releases.slice(0, 6).map((release, index) => (
          <div key={index} className="group cursor-pointer w-48 transition-transform hover:scale-105">
            <div className="relative aspect-square w-48 mb-4">
              <Image
                src={release.artwork || "/danhdoi.png"}
                alt={release.title}
                fill
                className="object-cover rounded-md "
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold truncate">
                {release.title}
                {release.featuring && <span className="text-gray-400"> (feat. {release.featuring})</span>}
              </h3>
              <p className="text-sm text-gray-400">
                {release.year} • {release.type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  )
}

