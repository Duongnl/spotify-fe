"use client"
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { LoginServerActions } from './login_server_actions';
import { useRouter } from 'next/navigation';

type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

type FormErrors = {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    remember: false,
  });
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()


  const handleSubmit = async () => {

    // if (!validateForm()) {
    //   return;
    // }

    setIsSubmitting(true);
    try {
      // Giả lập API call đăng nhập
      // await new Promise(resolve => setTimeout(resolve, 1000));

      // Xử lý đăng nhập thành công
      // console.log('Đăng nhập thành công:', formData);
      // Điều hướng hoặc xử lý đăng nhập ở đây
      
        const loginRequest:any = {
            username: formData.email,
            password: formData.password
        }
        console.log("loginRequest >>>", loginRequest)
        const res = await LoginServerActions(loginRequest)
        // login  thanh cong
        if (res && res.status === 200) {

            router.push("/")
        }

    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div  className="space-y-6">
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
          Địa chỉ email hoặc tên người dùng
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Địa chỉ email hoặc tên người dùng"
          value={formData.email}
          className={`w-full bg-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-600'
            } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
          Mật khẩu
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          className={`w-full bg-gray-900 border ${errors.password ? 'border-red-500' : 'border-gray-600'
            } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      {/* Login Button */}
      <div>
        <button
          type="submit"
          // disabled={isSubmitting}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded-full transition duration-200 disabled:opacity-70"
         onClick={() => {handleSubmit()}}
        >
          {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </div>
    </div>
  );
}