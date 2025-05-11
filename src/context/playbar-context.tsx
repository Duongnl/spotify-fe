"use client"
import API from '@/api/api';
import { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import cookie from "js-cookie"
import { useUserContext } from './user-context';

type PlaybarContextType = {
  currentAudioPlaying: string
  setCurrentAudioPlaying: (v: string) => void
  audioRef: any
  isPlaying: boolean
  setIsPlaying: (v: boolean) => void
  playMusic: (trackId: string) => void;
  // setTrackFile: (v: string) => void
  // trackFile: string
  setTrackName: (v: string) => void
  trackName: string
  setArtistName: (v: string) => void
  artistName: string
  setImg: (v: string) => void
  img: string
  currentTime: number
  setCurrentTime: (v: number) => void
  duration: number,
  setDuration: (v: number) => void
  setIdPlaybar: (v: any) => void
  idPlaybar: any
  videoUrl: string;
  setIsSeeking: (v: any) => void,
  isSeeking: any
};

const PlaybarContext = createContext<PlaybarContextType | undefined>(undefined);

export const PlaybarProvider = ({ children }: { children: ReactNode }) => {

  const { setUser, fetchGetUser, user } = useUserContext();

  // Nếu user chưa được fetch xong → chưa render


  const [currentAudioPlaying, setCurrentAudioPlaying] = useState<string>("");
  const audioRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // const [trackFile, setTrackFile] = useState<any>("");
  const [artistName, setArtistName] = useState<any>("");
  const [trackName, setTrackName] = useState<any>("");
  const [img, setImg] = useState<any>("");
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [idPlaybar, setIdPlaybar] = useState<any>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    if (user?.playbar?.track) {
      setCurrentAudioPlaying(user.playbar.track.id);
      setTrackName(user.playbar.track.title);
      setArtistName(user.playbar.track.title); // hoặc dữ liệu khác tùy bạn
      setImg(user.playbar.track.image_file);
      setDuration(user.playbar.track.duration)
      setIdPlaybar(user.playbar.id)
      setCurrentTime(user.playbar.currentTime)
      setVideoUrl(user.playbar.track.video_file)
    }
  }, [user])


  const playMusic = async (trackId: string) => {
    if (currentAudioPlaying && currentAudioPlaying !== trackId && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }

    if (!audioRef.current || currentAudioPlaying !== trackId) {
      const res = await fetch(API.TRACK.GET_TRACK(trackId), {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.get("session-id")}`,
        },
      });

      const data = await res.json();
      if (data && data.status === 200) {

        const audio = new Audio(`https://res.cloudinary.com/moment-images/${data.data.track_file}`);
        audioRef.current = audio;


        if (trackId !== currentAudioPlaying) {
          audio.currentTime = 0;
          await fetchSaveCurrentTime(data.data.id, 0);
        } else {
          const shouldReset = currentTime >= (duration || Number.MAX_VALUE);
          if (shouldReset) {
            audio.currentTime = 0;
            await fetchSaveCurrentTime(data.data.id, 0);
          } else {
            audio.addEventListener("loadedmetadata", () => {
              audio.currentTime = currentTime;
              setDuration(audio.duration);
            });
          }
        }



        // Gán sự kiện timeupdate để cập nhật currentTime
        audio.addEventListener("timeupdate", () => {
          if (!isSeeking) {
            setCurrentTime(audio.currentTime);
          }
        });

        // Khi kết thúc
        audio.addEventListener("ended", async () => {
          await fetchSaveCurrentTime(currentAudioPlaying, audio.currentTime)
          setIsPlaying(false);
          audioRef.current = null;
        });


        audio.play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error("Error playing audio:", error));

        setCurrentAudioPlaying(trackId);

        const name = data.data.artists.map((artist: any) => artist.artist.name).join(", ");
        console.log("Name play bar: ", name);

        const video = data.data.video_file;
        console.log("Video track: ", video);

        setVideoUrl(video);
        setArtistName(name);
        setTrackName(data.data.title);
        setImg(data.data.image_file);
      }
    } else {
      if (isPlaying) {
        await fetchSaveCurrentTime(currentAudioPlaying, currentTime)
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play()
          .then(() => setIsPlaying(true));
      }
    }
  };

  const fetchSaveCurrentTime = async (id: any, currTime: any) => {

    const dataRes = {
      track_id: id,
      currentTime: Math.floor(currTime),
      is_repeat: true
    }

    const res = await fetch(`${API.PLAYBAR.UPDATE}${idPlaybar}/`, {
      method: "PUT", // Đúng phương thức PUT
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json", // Đặt Content-Type là JSON
        Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
      },
      body: JSON.stringify(dataRes), // Gửi dữ liệu JSON
    });
    const data = await res.json();
  }






  return (

    <PlaybarContext.Provider value={{
      currentAudioPlaying,
      setCurrentAudioPlaying,
      audioRef,
      isPlaying,
      setIsPlaying,
      playMusic,
      // setTrackFile,
      // trackFile,
      trackName,
      setTrackName,
      setArtistName,
      artistName,
      img,
      setImg,
      currentTime,
      setCurrentTime,
      duration,
      setDuration,
      setIdPlaybar,
      idPlaybar,
      videoUrl,
      setIsSeeking,
      isSeeking
    }}>
      {children}
    </PlaybarContext.Provider>

  );
};

export const usePlaybarContext = () => {
  const context = useContext(PlaybarContext);
  if (!context) throw new Error('usePlaybarContext must be used within a UserProvider');
  return context;
};
