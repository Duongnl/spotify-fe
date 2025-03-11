import Image from 'next/image';

export default function MusicPlayer() {
  return (
    <div className="flex items-center bg-[#1a2a3a] text-white p-4 mt-4 ml-4 rounded-lg">
      <div className="flex flex-col md:flex-row  w-full mx-auto gap-6">
        <div className="relative w-full md:w-80 h-60 shrink-0">
            <Image
                src='/danhdoi.png'
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="Album cover"
                fill
                className="object-cover rounded-md"
                priority
            />
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-sm text-gray-300 mb-2">Song</div>

          <h1 className="text-7xl font-bold tracking-tight mb-6">Đánh Đổi</h1>

          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-700">
              <Image
                src="/danhdoi.png"
                alt="Artist avatar"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <span className="font-medium">Obito</span>
              <span className="text-gray-400">•</span>
              <span>Đánh Đổi</span>
              <span className="text-gray-400">•</span>
              <span>2023</span>
              <span className="text-gray-400">•</span>
              <span>3:46</span>
              <span className="text-gray-400">•</span>
              <span>25,854,267</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

