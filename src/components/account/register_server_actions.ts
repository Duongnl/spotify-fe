'use server'
import API from "@/api/api";
import { setSessionId } from "@/utils/session-store";
export const RegisterServerActions = async (registerRequest: any) => {

    // post login

    const res = await fetch(API.USER.REGISTER, {
      method: "POST", // Đúng phương thức POST
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json", // Đặt Content-Type là JSON
      },
      body: JSON.stringify(registerRequest), // Gửi dữ liệu JSON
    });

    const data = await res.json();

    // thanh cong
    if (data && data.status === 201) {
        setSessionId(data.data.tokens.access);
    }
    console.log(data)
    return data;
}
