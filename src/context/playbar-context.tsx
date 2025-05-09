"use client"
import API from '@/api/api';
import { createContext, useContext, useState, ReactNode, useRef } from 'react';
import cookie from "js-cookie"
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
};

const PlaybarContext = createContext<PlaybarContextType | undefined>(undefined);

export const PlaybarProvider = ({ children }: { children: ReactNode }) => {


  const [currentAudioPlaying, setCurrentAudioPlaying] = useState<string>("");
  const audioRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // const [trackFile, setTrackFile] = useState<any>("");
  const [artistName, setArtistName] = useState<any>("");
  const [trackName, setTrackName] = useState<any>("");
  const [img, setImg] = useState<any>("");


  const playMusic = async (trackId: string) => {



    // Nếu đang phát bài khác → dừng lại và phát bài mới
    if (currentAudioPlaying !== trackId) {

      // Dừng nhạc hiện tại
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const res = await fetch(API.TRACK.GET_TRACK(trackId), {
        method: "GET", // Đúng phương thức POST
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json", // Đặt Content-Type là JSON
          Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
        },
      });
      const data = await res.json();
      if (data && data.status === 200) {

        const audio = new Audio(`https://res.cloudinary.com/moment-images/${data.data.track_file}`);
        audioRef.current = audio;

        audio.play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error("Error playing audio:", error));

        audio.addEventListener("ended", () => {
          setIsPlaying(false);
          audioRef.current = null;
          setCurrentAudioPlaying("");
        });

        setCurrentAudioPlaying(trackId);

        let name = data.data.artists.map((artist: any) => artist.artist.name).join(", ");
        setArtistName(name);

        setTrackName(data.data.title)
        setImg(data.data.image_file)

      }



    } else {
      // Nếu đang phát cùng bài đó → toggle play/pause
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play()
          .then(() => setIsPlaying(true))
      }
    }
  };






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
      setImg
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
