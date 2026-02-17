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
        <div className="text-center space-y-2">
          <h1 className="text-white text-3xl font-bold">Sign In</h1>
          <p className="text-zinc-500">Choose an account to test the demo.</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin("user")}
            className="w-full p-6 text-left border border-zinc-800 hover:border-brand-orange bg-zinc-800/50 rounded-xl transition-all group"
          >
            <p className="text-white font-bold group-hover:text-brand-orange transition-colors">
              Standard User
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              Access to basic dashboard features.
            </p>
          </button>

          <button
            onClick={() => handleLogin("admin")}
            className="w-full p-6 text-left border border-zinc-800 hover:border-brand-orange bg-zinc-800/50 rounded-xl transition-all group"
          >
            <p className="text-white font-bold group-hover:text-brand-orange transition-colors">
              Administrator
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              Full access including the Admin Portal.
            </p>
          </button>
        </div>

        <div>
          <Link to="/" className="btn-secondary min-w-[160px]">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
