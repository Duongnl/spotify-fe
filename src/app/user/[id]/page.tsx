import Header from '../../../components/user/Header';
import MyPlatList from '../../../components/user/MyPlayList'
import API from "@/api/api";
import { getSessionId } from "@/utils/session-store";

export default async function User(props: any) {
  const { params } = props;
  
  const res = await fetch(API.USER.GET_USER(params.id), {
    method: "GET", // Đúng phương thức POST
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json", // Đặt Content-Type là JSON
      Authorization: `Bearer ${getSessionId()}`, // Set Authorization header
    },
  });

  const data = await res.json();
  return (
    <>
    <Header data = {data}/>
    <MyPlatList/>
    </>
  )
}