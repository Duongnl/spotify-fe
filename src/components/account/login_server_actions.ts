'use server'
import API from "@/api/api";
import { setSessionId } from "@/utils/session-store";
export const LoginServerActions = async (loginRequest: any) => {

    // post login

    const res = await fetch(API.USER.LOGIN, {
      method: "POST", // Đúng phương thức POST
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json", // Đặt Content-Type là JSON
      },
      body: JSON.stringify(loginRequest), // Gửi dữ liệu JSON
    });

    const data = await res.json();

    // thanh cong
    if (data && data.status === 200) {
        setSessionId(data.data.tokens.access);
    }
    console.log(data)
    return data;
}
