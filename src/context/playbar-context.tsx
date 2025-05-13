"use client"
import API from '@/api/api';
import { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import cookie from "js-cookie"
import { useUserContext } from './user-context';
import { getNextTrackId } from '@/utils/get_id_track';
import { useQueuebarContext } from './queuebar-context';

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

  repeatRef: any
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

  const { queueTracks } = useQueuebarContext()
  const repeatRef = useRef<any>(false);



  useEffect(() => {
    if (user?.playbar?.track) {
      setCurrentAudioPlaying(user.playbar.track.id);
      setTrackName(user.playbar.track.title);
      setArtistName(user.playbar.track.artistName.join(', ')); // hoặc dữ liệu khác tùy bạn
      setImg(user.playbar.track.image_file);
      setDuration(user.playbar.track.duration)
      setIdPlaybar(user.playbar.id)
      setCurrentTime(user.playbar.currentTime)
      setVideoUrl(user.playbar.track.video_file)

      repeatRef.current = user.playbar.is_repeat
      currentAudioPlayingRef.current = user.playbar.track.id
    }
  }, [user])

  const queueTracksRef = useRef(queueTracks);
  const currentAudioPlayingRef = useRef(currentAudioPlaying);

  useEffect(() => {
    queueTracksRef.current = queueTracks;
  }, [queueTracks]);

  useEffect(() => {
    currentAudioPlayingRef.current = currentAudioPlaying;
  }, [currentAudioPlaying]);



  const playMusic = async (trackId: string) => {

    if (audioRef.current && currentAudioPlaying === trackId) {
      if (isPlaying) {
        audioRef.current.pause();
        await fetchSaveCurrentTime(trackId, audioRef.current.currentTime);
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
      return; // Không cần load lại bài cũ
    }

    // Reset audio nếu phát bài mới
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }


    // if (!audioRef.current || currentAudioPlaying !== trackId) {
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
        setDuration(data.data.duration)
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

      setCurrentAudioPlaying(trackId);
      currentAudioPlayingRef.current = trackId;

      audio.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Error playing audio:", error));

      // Khi kết thúc
      // audio.addEventListener("ended", async () => {

      //   if (repeatRef.current) {
      //     await fetchSaveCurrentTime(trackId, 0)

      //     // Nếu bật repeat thì phát lại bài hiện tại
      //     audio.currentTime = 0;
      //     audio.play()
      //       .then(() => setIsPlaying(true))
      //       .catch((err) => console.error("Replay failed:", err));
      //   } else {
      //     const id = getNextTrackId(trackId, queueTracks)
      //     console.log("next >>>", queueTracks)
      //     console.log("currentAudioPlaying >>>", currentAudioPlaying)
      //     console.log("track id >>>", trackId)
      //     console.log("next id >>>", id)


      //     await playMusic(id);
      //   }

      //   // await fetchSaveCurrentTime(currentAudioPlaying, audio.currentTime)
      //   // setIsPlaying(false);
      //   // audioRef.current = null;
      // });

      audio.addEventListener("ended", async () => {
        const repeat = repeatRef.current;
        const currentQueue = queueTracksRef.current;
        const currentTrackId = currentAudioPlayingRef.current;


        if (repeat) {
          await fetchSaveCurrentTime(trackId, 0);

          audio.currentTime = 0;
          audio.play()
            .then(() => setIsPlaying(true))
            .catch((err) => console.error("Replay failed:", err));
        } else {
          const nextId = getNextTrackId(currentTrackId, currentQueue);
          console.log("next >>>", currentQueue);
          console.log("currentAudioPlaying >>>", currentTrackId);
          console.log("track id >>>", trackId);
          console.log("next id >>>", nextId);

          await playMusic(nextId);
        }
      });

      const name = data.data.artists.map((artist: any) => artist.artist.name).join(", ");

      console.log("Name play bar: ", name);

      const video = data.data.video_file;
      console.log("Video track: ", video);

      setVideoUrl(video);
      setArtistName(name);
      setTrackName(data.data.title);
      setImg(data.data.image_file);
    }
    // } 
    // else {
    //   if (isPlaying) {
    //     await fetchSaveCurrentTime(currentAudioPlaying, currentTime)
    //     audioRef.current?.pause();
    //     setIsPlaying(false);
    //   } else {
    //     audioRef.current?.play()
    //       .then(() => setIsPlaying(true));
    //   }
    // }
  };



  const fetchSaveCurrentTime = async (id: any, currTime: any) => {

    if (user.playbar === null) {

      const dataRes = {
        track_id: id,
        currentTime: Math.floor(currTime),
        "is_repeat": false
      }

      const resp = await fetch(`${API.PLAYBAR.UPDATE}`, {
        method: "POST", // Đúng phương thức PUT
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json", // Đặt Content-Type là JSON
          Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
        },
        body: JSON.stringify(dataRes), // Gửi dữ liệu JSON
      });
      const data = await resp.json();
      if (data && data.status === 200) {

        const req = {
          playbar_id: data.data.id
        }
        const res = await fetch(`${API.USER.UPDATE_PLAYBAR_ID}${user.id}/`, {
          method: "POST", // Đúng phương thức PUT
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json", // Đặt Content-Type là JSON
            Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
          },
          body: JSON.stringify(req), // Gửi dữ liệu JSON
        });
        const data1 = await res.json();
        if (data1 && data1.status === 200)  {
         await  fetchGetUser()
        }
      }

    } else {
      const dataRes = {
        track_id: id,
        currentTime: Math.floor(currTime),
      }

      const res1 = await fetch(`${API.PLAYBAR.UPDATE}${idPlaybar}/`, {
        method: "PUT", // Đúng phương thức PUT
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json", // Đặt Content-Type là JSON
          Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
        },
        body: JSON.stringify(dataRes), // Gửi dữ liệu JSON
      });
      const data = await res1.json();
    }



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
      isSeeking,

      repeatRef
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
