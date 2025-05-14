// app/api/gemini/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    // Sử dụng fetch để gọi Google Gemini API trực tiếp
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    // Kiểm tra nếu response có dữ liệu trả về
    if (!response.ok) {
      const errorData = await response.json();  // Lấy dữ liệu lỗi chi tiết từ Google API
      console.error('API Error:', errorData);
      throw new Error(`API error: ${errorData.error.message}`);
    }


    const data = await response.json();
    const text = data.text;

    // Trả về kết quả
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
