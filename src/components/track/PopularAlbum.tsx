"use client"

import Image from "next/image"
import { ChevronRight } from "lucide-react"

interface Release {
  title: string
  year: string
  type: string
  image: string
}


export default function PopularReleases() {
  const releases: Release[] = [
    {
      title: "Đánh Đổi",
      year: "2023",
      type: "Album",
      image: "/danhdoi.png",
    },
    {
      title: "Simple Love",
      year: "2022",
      type: "Single",
      image: "/danhdoi.png",
    },
    {
      title: "Shay năngggg",
      year: "2022",
      type: "Single",
      image: "/danhdoi.png",
    },
    {
      title: "Phong Long",
      year: "2024",
      type: "Single",
      image: "/danhdoi.png",
    },
    {
      title: "When You Look at Me (feat. Seachains)",
      year: "2019",
      type: "Single",
      image: "/danhdoi.png",
    },
    {
      title: "Si me you",
      year: "2022",
      type: "Single",
      image: "/danhdoi.png",
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
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {releases.map((release, index) => (
                <div key={index} className="group">
                  <div className="relative aspect-square mb-4">
                    <Image
                      src={release.image || "/placeholder.svg"}
                      alt={release.title}
                      fill
                      className="object-cover rounded-md transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium line-clamp-2 group-hover:text-white">{release.title}</h3>
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

