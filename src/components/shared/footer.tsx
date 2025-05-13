import Link from "next/link"
import { Instagram, Twitter, Facebook } from "lucide-react"

export default function SpotifyFooter() {
  return (
    
    <footer className="bg-black text-white py-6 px-10 bottom-0 w-full h-[362px]">

      <div className="max-w-7xl mx-auto pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>
            <h3 className="font-bold text-base mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  For the Record
                </Link>
              </li>
            </ul>
          </div>

        
          <div>
            <h3 className="font-bold text-base mb-6">Communities</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  For Artists
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Developers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Advertising
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Vendors
                </Link>
              </li>
            </ul>
          </div>

        
          <div>
            <h3 className="font-bold text-base mb-6">Useful links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Free Mobile App
                </Link>
              </li>
            </ul>
          </div>

       
          <div>
            <h3 className="font-bold text-base mb-6">Spotify Plans</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Premium Individual
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Premium Student
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Spotify Free
                </Link>
              </li>
            </ul>
          </div>
        </div>

       
        <div className="flex justify-start md:justify-end mt-8 space-x-4">
          <Link href="#" className="bg-[#222222] p-3 rounded-full flex items-center hover:bg-[#333333] transition-colors">
            <Instagram className="w-5 h-5" />
           
          </Link>
          <Link href="#" className="bg-[#222222] p-3 rounded-full hover:bg-[#333333] transition-colors">
            <Twitter className="w-5 h-5" />
        
          </Link>
          <Link href="#" className="bg-[#222222] p-3 rounded-full hover:bg-[#333333] transition-colors">
            <Facebook className="w-5 h-5" />
           
          </Link>
        </div>

        
        <div className="border-t border-[#333333] my-8"></div>

       
        <div className="flex flex-col md:flex-row justify-between items-start md:items-centerr">
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 md:mb-0">
            <Link href="#" className="text-white/70 text-sm hover:text-white transition-colors">
              Legal
            </Link>
            <Link href="#" className="text-white/70 text-sm hover:text-white transition-colors">
              Safety & Privacy Center
            </Link>
            <Link href="#" className="text-white/70 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/70 text-sm hover:text-white transition-colors">
              Cookies
            </Link>
            <Link href="#" className="text-white/70 text-sm hover:text-white transition-colors">
              About Ads
            </Link>
            <Link href="#" className="text-white/70 text-sm hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
          <div className="text-white/70 text-sm">© 2025 Spotify AB</div>
        </div>
      </div>
    </footer>
  )
}

