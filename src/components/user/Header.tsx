import Image from 'next/image';

export default function UserHeader() {
  return (
    <div className="flex items-center bg-[#1a2a3a] text-white p-4 mt-4 ml-2 rounded-lg">

      <div className="flex flex-col md:flex-row  w-full mx-auto gap-6 items-center">
        <div className="relative w-60 h-60 shrink-0 flex items-center justify-center">
          <Image
            src="/danhdoi.png"
            alt="Album cover"
            fill
            className="object-cover rounded-full"
            priority
          />
        </div>


        <div className="flex flex-col justify-center">
          <div className="text-sm text-gray-300 mb-2">Profile</div>

          <h3 className="text-4xl font-bold tracking-tight mb-6">DuonggNL</h3>

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
              <span>3 Public Playlists</span>
              <span className="text-gray-400">•</span>
              <span>1 Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

