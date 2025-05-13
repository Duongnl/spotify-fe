// src/api/chat/route.ts
import { NextResponse } from 'next/server';
import API from '../../../api/api';

// Lấy API Key từ biến môi trường
const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;

if (!GEMINI_API_KEY) {
  console.error('FATAL ERROR: GEMINI_API_KEY is not set in environment variables.');
}

const MODEL_NAME = "gemini-pro"; // Thay bằng model phù hợp
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

// Hàm xử lý tin nhắn và gọi AI
async function getAIResponse(message: string): Promise<string> {
  console.log("User Message:", message);

  const lowerCaseMessage = message.toLowerCase();
  let artistsData = null;

  // Kiểm tra yêu cầu liên quan đến nhạc sĩ
  if (lowerCaseMessage.includes('nhạc sĩ') || lowerCaseMessage.includes('nghệ sĩ') || lowerCaseMessage.includes('danh sách ca sĩ')) {
    try {
      const artistsApiUrl = API.ARTIST.GET_ARTISTS;
      console.log(`Fetching artists from: ${artistsApiUrl}`);
      const response = await fetch(artistsApiUrl);

      if (response.ok) {
        artistsData = await response.json();
        console.log("Fetched Artists Data:", artistsData);
      } else {
        console.error(`Failed to fetch artists: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  }

  // Xây dựng dữ liệu cho prompt
  const contextData = {
    fetchedArtists: artistsData,
  };

  const contextDataString = JSON.stringify(contextData, null, 2);

  const prompt = `
    Bạn là trợ lý AI của ứng dụng Spotify. Nhiệm vụ của bạn là trả lời các câu hỏi của người dùng về âm nhạc và đưa ra gợi ý dựa trên dữ liệu hệ thống được cung cấp.
    
    Dữ liệu hệ thống (JSON):
    ${contextDataString}

    Yêu cầu của người dùng: "${message}"

    Dựa vào yêu cầu và dữ liệu hệ thống, hãy đưa ra phản hồi tốt nhất.
  `;

  try {
    // Gọi API Google Generative AI
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: {
          text: prompt,
        },
        maxOutputTokens: 200,
      }),
    });

    if (!response.ok) {
      console.error('Error from Gemini API:', response.statusText);
      return `Xin lỗi, tôi gặp sự cố với AI: ${response.statusText}`;
    }

    const data = await response.json();
    const aiResponseText = data.candidates?.[0]?.output ?? "Không có phản hồi từ AI.";

    return aiResponseText;

  } catch (error: any) {
    console.error('Error calling Gemini API:', error);

    // Kiểm tra xem error có response hay không (lỗi từ API)
    if (error.response) {
      console.error('Response Error Data:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request Error - No Response:', error.request);
    } else {
      console.error('Unexpected Error:', error.message);
    }

    return `Xin lỗi, tôi gặp sự cố khi xử lý yêu cầu của bạn. Chi tiết: ${error.message}`;
  }
}

// Export hàm POST của API Route
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Gọi hàm xử lý AI
    const aiResponse = await getAIResponse(message);

    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
