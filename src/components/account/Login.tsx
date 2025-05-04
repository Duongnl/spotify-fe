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

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email của bạn.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ. Đảm bảo nó được viết dưới dạng example@email.com';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu của bạn.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear errors when user types
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

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
          onChange={handleChange}
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
          onChange={handleChange}
          className={`w-full bg-gray-900 border ${errors.password ? 'border-red-500' : 'border-gray-600'
            } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          checked={formData.remember}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-600 bg-gray-900 text-green-500 focus:ring-green-500"
        />
        <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
          Ghi nhớ đăng nhập
        </label>
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