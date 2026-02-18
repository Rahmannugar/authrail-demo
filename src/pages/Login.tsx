import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth/authStore";
import { login } from "../lib/mock/db";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  async function handleLogin(type: "admin" | "user") {
    const user = await login(type);
    setUser(user);
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full card space-y-10">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <img src="/authrail.png" alt="AuthRail" className="h-10 w-auto" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Sign In
          </h1>
          <p className="text-zinc-500">Choose an account to test the demo.</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin("user")}
            className="w-full p-6 text-left border border-zinc-800 hover:border-brand-orange bg-zinc-800/50 rounded-xl transition-all group flex items-center justify-between"
          >
            <div>
              <p className="text-white font-bold group-hover:text-brand-orange transition-colors">
                Standard User
              </p>
              <p className="text-zinc-500 text-xs mt-1">
                Access to basic dashboard features.
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-700 group-hover:text-brand-orange group-hover:translate-x-1 transition-all"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <button
            onClick={() => handleLogin("admin")}
            className="w-full p-6 text-left border border-zinc-800 hover:border-brand-orange bg-zinc-800/50 rounded-xl transition-all group flex items-center justify-between"
          >
            <div>
              <p className="text-white font-bold group-hover:text-brand-orange transition-colors">
                Administrator
              </p>
              <p className="text-zinc-500 text-xs mt-1">
                Full access including the Admin Portal.
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-700 group-hover:text-brand-orange group-hover:translate-x-1 transition-all"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="pt-4 border-t border-zinc-800/50">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-zinc-500 hover:text-white transition-all duration-200 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:-translate-x-1"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="text-sm font-medium">Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
