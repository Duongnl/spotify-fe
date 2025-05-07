import Image from "next/image"
import { ChevronRight } from "lucide-react"
import Link from "next/link"


interface AlbumProps {
  data: any;
}

export default function DiscographySection(props: AlbumProps) {

  const {data} = props;

  console.log("data album = ", data);

  return (
    <div className="bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Discography</h2>
        <Link href="#" className="flex text-sm text-gray-400 hover:text-white transition-colors">
          Show all
          <ChevronRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
  
      <div className="flex gap-2 mb-6">
        <button className="py-1 px-4 rounded-full bg-white text-black hover:bg-white/90">
          Albums
        </button>
      </div>
  
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.data.albums.map((album:any) => (
          <div key={album.id} className="group">
            <div className="relative aspect-square mb-4">
              <Image
                src={`https://res.cloudinary.com/moment-images/${album.imageUrl}`}
                
                alt={album.title}
                fill
                className="object-cover rounded-md transition-transform group-hover:scale-105"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium line-clamp-2 group-hover:text-white">{album.title}</h3>
              <p className="text-sm text-gray-400">
                {new Date(album.releaseDate).getFullYear()} • Album
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

