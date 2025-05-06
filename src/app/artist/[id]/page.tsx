import Header from '../../../components/artist/Header'
import ArtistControls from '../../../components/artist/ArtistControls'
import PopularList from '../../../components/artist/PopularList'
import Discography from '../../../components/artist/Discography'
import ArtistAbout from '../../../components/artist/About'
import API from "@/api/api";
import { getSessionId } from "@/utils/session-store";

export default async function Artits(props: any) {
  const { params } = props;
  
  const res = await fetch(API.ARTIST.GET_ARTIST(params.id), {
    method: "GET", // Đúng phương thức POST
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json", // Đặt Content-Type là JSON
      Authorization: `Bearer ${getSessionId()}`, // Set Authorization header
    },
  });

  const data = await res.json();

  // console.log("data: ", data);

  return (
    <>
    <Header data = {data}/>
    <ArtistControls />
    <PopularList data = {data} />
    <Discography data = {data}/>
    <ArtistAbout data = {data}/>
    </>
  )
}