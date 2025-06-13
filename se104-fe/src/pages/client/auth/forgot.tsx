import { useNavigate } from "react-router-dom";
import { forgotPassword } from "@/services/api";
import { message } from "antd";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!email) {
      message.warning("Vui lòng nhập email!");
      return;
    }

    try {
      const res = await forgotPassword(email);
      if (res) {
        message.success("Gửi mã OTP thành công");
        navigate("/verification", {
          state: {
            email: email,
            mode: "forgot",
          },
        });
      } else {
        message.error("Gửi mã OTP thất bại!");
      }
    } catch (error) {
      message.error("Thất bại");
      console.error("OTP error:", error);
    }
  }


  return (
    <div className="min-h-screen bg-[#0a3d3f] flex items-center justify-center relative overflow-hidden p-4">
      <div className="absolute top-5 left-5 flex items-center space-x-2 text-white text-lg font-semibold">
        <img
          src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
          alt="Library Logo"
          className="w-8 h-8 filter invert"
        />
        <span className="hidden sm:inline">Library</span>
      </div>


      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto z-10 shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Forgot Password</h1>
          <p className="text-base sm:text-lg text-gray-200">
            Please enter your email to receive a confirmation code to set a new password
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#21b39b] transition-all text-sm sm:text-base"
              autoComplete="email"
            />
          </div>
        </div>

        <button
          onClick={handleSendOTP}
          className="w-full py-3 bg-[#21b39b] rounded-lg text-white font-semibold hover:bg-[#1a9c86] transition-colors shadow-lg mt-6 text-sm sm:text-base"
        >
          Confirm Email
        </button>

        <div className="text-center text-white/80 text-sm mt-4">
          Remember your password?{" "}
          <a
            href="/signin"
            style={{
              color: "white",
              fontWeight: "500",
              textDecoration: "underline",
              transition: "color 0.3s",
            }}
          >
            Sign In
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-0 h-[180px] sm:h-[260px]">
        <svg
          viewBox="0 0 1917 253"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#345c5b"
            fillOpacity="1"
            d="M 758.802 100.0837 C 448 120.246 279.336 115.5669 0 100.0837 V 130.063 C 307.343 150.749 542.161 151.062 783.891 140.983 C 889.408 135.964 996.242 128.632 1111 120.063 C 1488.66 95.9929 1594.95 80.9355 1917 120.063 V 100.0837 C 1660 30.356 1334.76 60.51373 758.802 100.0837 Z"
          />
          <path
            fill="#eff4f2"
            fillOpacity="1"
            d="M 0 261 H 1917 V 238.829 V 160.266 C 1581.64 120.2362 1373.88 118.0273 947.5 160.266 C 924.233 162.458 901.598 164.479 879.509 166.308 C 558.784 205.911 353.178 215.238 0 160.266 L 0 261 Z"
          />
          <path
            fill="#7c9b99"
            fillOpacity="1"
            d="M 1917 120.063 C 1594.95 80.9355 1488.66 95.9929 1111 120.063 C 996.242 128.632 889.408 135.964 783.891 140.983 C 542.161 151.062 307.343 150.749 0 130.063 L 0 160.266 C 353.178 215.238 558.784 205.911 879.509 166.308 C 901.598 164.479 924.233 162.458 947.5 160.266 C 1373.88 118.0273 1581.64 120.2362 1917 160.266 V 120.063 Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
