// src/components/AIChat/Chatbox.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { usePlaybarContext } from "@/context/playbar-context"; // Giữ nguyên nếu bạn dùng context này

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
    setIsLoading(true); // Bắt đầu trạng thái loading

    try {
      // **Gửi tin nhắn đến API Route backend /api/chat**
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      if (!response.ok) {
        // Xử lý lỗi nếu API backend gặp vấn đề
        const errorData = await response.json();
        console.error('Error from backend API:', errorData.error);
        const errorMessage: Message = { text: 'Đã xảy ra lỗi từ máy chủ AI.', sender: 'ai' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        return; // Dừng xử lý nếu có lỗi
      }

      const data = await response.json();
      const aiResponseText = data.response; // Lấy phản hồi từ backend

      // **Thêm phản hồi của AI vào danh sách tin nhắn**
      const aiMessage: Message = { text: aiResponseText, sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

    } catch (error) {
      console.error('Error sending message to backend:', error);
      const errorMessage: Message = { text: 'Không thể kết nối đến dịch vụ AI.', sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false); // Kết thúc trạng thái loading
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
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
                fontSize: "14px"
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