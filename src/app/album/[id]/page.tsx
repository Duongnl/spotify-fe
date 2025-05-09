import API from "@/api/api";
import AlbumTitle from "@/components/album/album_container"
import { getSessionId } from "@/utils/session-store";

const AlbumPage = async (props: any) => {
    const { params } = props;

    const res = await fetch(API.ALBUM.GET_ALBUM(params.id), {
        method: "GET", // Đúng phương thức POST
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json", // Đặt Content-Type là JSON
          Authorization: `Bearer ${getSessionId()}`, // Set Authorization header
        },
      });
    
      const data = await res.json();
    
       const resAlbum = await fetch(API.ALBUM.GET_ALBUMS, {
        method: "GET", // Đúng phương thức POST
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json", // Đặt Content-Type là JSON
          Authorization: `Bearer ${getSessionId()}`, // Set Authorization header
        },
      });
    
      const dataAlbum = await resAlbum.json();


    return (
        <>
            <AlbumTitle 
            res = {data}
            resAlbum = {dataAlbum}
            />
        </>
    )
}
export default AlbumPage