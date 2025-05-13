"use client"

import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

// interface Release {
//   title: string
//   year: string
//   type: string
//   image: string
// }

interface Props {
  name: string
  rowHomeResponse: RowHomeResponse[]
}


export default function RowHomeContent(props: Props) {
  const { rowHomeResponse, name } = props
  const router = useRouter()


  // const Link = (e: string, link: string) => {
  //   router.push(`${link}${e}`)
  // }

  return (
    <div className="bg-[#121212] text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{name}</h2>
        <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
          Show all
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full pb-4">
        <div className="flex gap-4 scroll-on-hover">
          {rowHomeResponse.map((release: any, index: any) => (
            <Link href={`${release.link}/${release.id}`} >
              <div
                key={index}
                className="group cursor-pointer w-40 flex-shrink-0" // w-40 = 160px
                // onClick={() => Link(release.id, release.link)}
              >
                <div className="relative aspect-square mb-4 w-full">
                  <Image
                    src={`https://res.cloudinary.com/moment-images/${release.img}`}
                    alt={release.title1}
                    fill
                    className="object-cover rounded-md transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium line-clamp-2 group-hover:text-white">
                    {release.title1}
                  </h3>
                  <p className="text-sm text-gray-400">{release.title2}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>

  )
}

