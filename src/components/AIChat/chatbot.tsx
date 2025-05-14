// src/components/AIChat/Chatbox.tsx
"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { usePlaybarContext } from "@/context/playbar-context"; // Giữ nguyên nếu bạn dùng context này
import { ChatBot } from "./chatbot_server_actions";
import cookie from "js-cookie";
import API from "@/api/api";

interface ChatboxProps {
  onClose: () => void;
}

const Chatbox: React.FC<ChatboxProps> = ({ onClose }) => {
  // Thay đổi kiểu dữ liệu tin nhắn để lưu cả người gửi
  interface Message {
    text: string;
    sender: 'user' | 'ai';
  }
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Thêm state loading
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref để cuộn tự động
  const [tracks, setTracks] = useState<any>([])
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const portalRoot = useRef<HTMLDivElement>(document.createElement("div"));

  // Giữ nguyên phần portal root
  useEffect(() => {
    document.body.appendChild(portalRoot.current);
    return () => {
      if (document.body.contains(portalRoot.current)) {
        document.body.removeChild(portalRoot.current);
      }
    };
  }, []);

  // Thêm effect để cuộn tự động khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  useEffect(() => {
    const fetchTracks = async () => {
      const resTracks = await fetch(API.TRACK.GET_TRACK_ARTISTS, {
        method: "GET", // Đúng phương thức POST
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json", // Đặt Content-Type là JSON
          Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
        },
      });
      const dataTracks = await resTracks.json();


      const resAlbums = await fetch(API.ALBUM.ALBUM_BASIC, {
        method: "GET", // Đúng phương thức POST
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json", // Đặt Content-Type là JSON
          Authorization: `Bearer ${cookie.get("session-id")}`, // Set Authorization header
        },
      });
      const dataAlbums = await resAlbums.json();
        const prompt = `
    Hệ thống của tôi là một ứng dụng Spotify clone.
    Dưới đây là dữ liệu object chứa thông tin các bài hát (tracks) và các chi tiết liên quan trong hệ thống của tôi.
    Tôi muốn bạn ghi nhớ dữ liệu này để trả lời các câu hỏi tiếp theo có liên quan.

    Đây là dữ liệu tracks:
    ${JSON.stringify(dataTracks, null, 2)}
    Đây là dữ liệu album : 
     ${JSON.stringify(dataAlbums, null, 2)}
  `;
        setChatHistory([prompt]);
        // const data: any = await ChatBot(prompt)
      
    }
    fetchTracks()
  }, [])


  if (!isVisible) return null;

  const closeChatbox = () => {
    setIsVisible(false);
    onClose();
  };

  const handleSendMessage = async () => { // Chuyển thành async
    if (!userMessage.trim() || isLoading) return;

    const messageToSend = userMessage;
    const newMessage: Message = { text: messageToSend, sender: 'user' };

    // Thêm tin nhắn của người dùng vào danh sách tin nhắn
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserMessage(""); // Xóa nội dung input
    // setIsLoading(true); // Bắt đầu trạng thái loading
    // const res =  await handleSubmit(messageToSend);
    const fullPrompt = [...chatHistory, messageToSend].join('\n');
    const data: any = await ChatBot(fullPrompt)

    const aiMessage: Message = { text: data, sender: 'ai' };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
    setChatHistory((prev) => [...prev, messageToSend, data]);


  };


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleGenerate = async () => {

    // const res = await fetch(`/api/gemini/${process.env.API_SECRET}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ prompt: input }),
    // });

    // const data = await res.json();
    // const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    // setResult(text);
  };


  return createPortal(
    // Đặt Draggable VÀ Resizable Ở ĐÂY, bên trong createPortal
    <Draggable handle=".handle">
      <Resizable
        defaultSize={{ width: 400, height: 400 }}
        minWidth={200}
        minHeight={250}
        maxWidth={800}
        maxHeight={600}
        style={{
          // Các style định vị popup
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          borderRadius: "8px",
          overflow: "hidden",
          display: isVisible ? 'flex' : 'none',
          flexDirection: "column"
        }}
      >
        {/* Nội dung của cửa sổ chat vẫn ở đây */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "white",
            borderRadius: "8px",
            overflow: "hidden"
          }}
        >
          <div
            className="handle" // Phần tử handle
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
              background: "#333",
              color: "white",
              cursor: "move",
              flexShrink: 0
            }}
          >
            <span style={{ fontSize: "14px" }}>Chat with AI</span>
            <button
              onClick={closeChatbox}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              ✕
            </button>
          </div>

          {/* Khu vực hiển thị tin nhắn */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              background: "#f5f5f5",
              color: 'black',
              display: "flex",
              flexDirection: "column"
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  maxWidth: "80%",
                  wordWrap: "break-word",
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'user' ? '#dcf8c6' : '#e0e0e0',
                  color: '#000'
                }}
              >
                <span style={{ fontWeight: "bold" }}>{msg.sender === 'user' ? 'You' : 'AI'}:</span> {msg.text}
              </div>
            ))}
            {isLoading && (
              <div style={{
                marginBottom: "10px",
                padding: "8px 12px",
                borderRadius: "5px",
                maxWidth: "80%",
                wordWrap: "break-word",
                alignSelf: 'flex-start',
                background: '#e0e0e0',
                color: '#000'
              }}>
                AI đang trả lời...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Khu vực nhập liệu */}
          <div
            style={{
              display: "flex",
              padding: "10px",
              background: "#f1f1f1",
              borderTop: "1px solid #ddd",
              flexShrink: 0
            }}
          >
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isLoading ? "Đang tải..." : "Type a message..."}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginRight: "10px",
                fontSize: "14px",
                color: "black"
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              style={{
                background: isLoading ? '#a5d6a7' : "#4CAF50",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "4px",
                cursor: isLoading ? 'not-allowed' : "pointer",
                transition: "background-color 0.3s ease"
              }}
            >
              Send
            </button>
          </div>
        </div>
      </Resizable>
    </Draggable>,
    // Vẫn render vào portalRoot.current
    portalRoot.current
  );
};

export default Chatbox;