import Header from '../../components/user/Header';
import UserControls from '../../components/user/UserControls'
import MyPlatList from '../../components/user/MyPlayList'
import Following from '../../components/user/Following'

export default function User() {
  return (
    <>
    <Header/>
    <UserControls/>
    <MyPlatList/>
    <Following/>
    </>
  )
}