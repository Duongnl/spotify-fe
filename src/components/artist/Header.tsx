import Image from "next/image"
import { CircleCheck } from "lucide-react"



export default function ArtistProfile() {
  return (
    <div className="relative w-full h-[320px] bg-black overflow-hidden">
    {/* Ảnh nghệ sĩ */}
    <div className="absolute inset-0">
      <Image
        src="/obito.png"
        alt="Artist profile image"
        fill
        className="object-cover object-center md:object-left"
        priority
      />
      {/* Hiệu ứng mờ gradient để dễ đọc chữ hơn */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
    </div>
  
    {/* Nội dung overlay */}
    <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end h-full">
      {/* Verified badge */}
      <div className="flex items-center gap-2 mb-4">
        <Image
          src="/verify.png"
          alt="Artist avatar"
          width={22}
          height={22}
          className="object-cover"
        />
        <span className="text-white text-lg">Verified Artist</span>
      </div>
  
      {/* Tên nghệ sĩ */}
      <h1 className="text-white text-7xl font-bold mb-4">Obito</h1>
  
      {/* Monthly listeners */}
      <p className="text-white text-lg">1,529,381 monthly listeners</p>
    </div>
  </div>
  
  )
}

