import Header from '../../../components/artist/Header'
import ArtistControls from '../../../components/artist/ArtistControls'
import PopularList from '../../../components/artist/PopularList'
import Discography from '../../../components/artist/Discography'
import ArtistAbout from '../../../components/artist/About'
import Footer from "@/components/shared/footer";
export default function Artits() {
  return (
    <>
    <Header/>
    <ArtistControls/>
    <PopularList/>
    <Discography/>
    <ArtistAbout/>
    </>
  )
}