import Image from "next/image"

import Link from "next/link"

interface Release {
  title: string
  year: string
  type: string
  image: string
}

export default function DiscographySection() {
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
    <div className="bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Discography</h2>
        <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
          Show all
        </Link>
      </div>

      <div className="flex gap-2 mb-6">
        <button className="py-1 px-4 rounded-full bg-white text-black hover:bg-white/90">
          Popular releases
        </button>
        <button className="py-1 px-4 rounded-full text-white hover:bg-white/10">
          Albums
        </button>
        <button className=" py-1 px-4 rounded-full text-white hover:bg-white/10">
          Singles and EPs
        </button>
      </div>

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
  )
}

