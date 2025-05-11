import PlaylistContainer from "@/components/playlist/playlist_container"
import API from "@/api/api";
import { getSessionId } from "@/utils/session-store";

const PlaylistPage = async (props: any) => {

    const { params } = props;

    const res = await fetch(API.PLAYLIST.GET_PLAYLIST(params.id), {
        method: "GET", // Đúng phương thức POST
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json", // Đặt Content-Type là JSON
          Authorization: `Bearer ${getSessionId()}`, // Set Authorization header
        },
      });
    
      const data = await res.json();
      console.log(data)

    return (
        <>
            <PlaylistContainer
                response = {data}
                params = {params.id}
            />
        </>
    )
}
export default PlaylistPage