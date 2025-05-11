"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { usePlaybarContext } from "@/context/playbar-context";

interface VideoMiniplayerProps {
  videoUrl: string;
  artistName: string;
  trackName: string;
  onClose: () => void;
}

const VideoMiniplayer: React.FC<VideoMiniplayerProps> = ({ videoUrl, artistName, trackName, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const portalRoot = useRef<HTMLDivElement>(document.createElement("div"));

   const { currentAudioPlaying, playMusic } = usePlaybarContext();

  // Thêm portal root vào body khi component mount
  useEffect(() => {
    document.body.appendChild(portalRoot.current);
    return () => {
      if (document.body.contains(portalRoot.current)) {
        document.body.removeChild(portalRoot.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  // Fallback UI nếu không có videoUrl
  if (!videoUrl) {
    return createPortal(
      <div
        style={{
          position: "fixed",
          bottom: "100px",
          right: "20px",
          width: "400px",
          height: "225px",
          background: "black",
          zIndex: 9999,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <p>No video available for this track</p>
      </div>,
      portalRoot.current
    );
  }

  const closeVideo = () => {
    playMusic(currentAudioPlaying)
    setIsVisible(false);
    onClose();
  }

  return createPortal(
    <Draggable>
      <Resizable
        defaultSize={{ width: 400, height: 225 }}
        minWidth={200}
        minHeight={150}
        maxWidth={800}
        maxHeight={450}
        style={{
          position: "fixed",
          bottom: "100px",
          right: "20px",
          zIndex: 9999,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "black",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
              background: "#333",
              cursor: "move",
            }}
          >
            <span style={{ color: "white", fontSize: "14px" }}>
              {trackName} - {artistName}
            </span>
            <button
              onClick={() => {
                closeVideo();
              }}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
          <video
            src={`https://res.cloudinary.com/moment-images/${videoUrl}`}
            controls
            autoPlay
            style={{ width: "100%", height: "calc(100% - 30px)" }}
          />
        </div>
      </Resizable>
    </Draggable>,
    portalRoot.current
  );
};

export default VideoMiniplayer;