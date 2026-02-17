import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../lib/auth/authStore";
import { RailBoundary } from "authrail";
import { authRail } from "../lib/rails/authRail";

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [blockDashboard, setBlockDashboard] = useState(false);

  return (
    <RailBoundary
      rail={authRail}
      context={{ user, blockDashboard }}
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-zinc-500 font-bold">Verifying access...</p>
        </div>
      }
      denied={
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-6">
          <h1 className="text-white text-4xl font-bold italic">
            Access Denied.
          </h1>
          <p className="text-zinc-500 max-w-sm">
            Access to the dashboard is currently blocked by a custom restriction
            rule.
          </p>
          <button
            onClick={() => setBlockDashboard(false)}
            className="btn-primary"
          >
            Clear Restriction
          </button>
        </div>
      }
      onRedirect={(to) => navigate(to)}
    >
      <div className="min-h-screen flex flex-col">
        <nav className="nav-bar">
          <div className="flex items-center gap-4">
            <img src="/authrail.png" alt="Logo" className="h-8 w-auto" />
            <div className="h-4 w-px bg-zinc-800" />
            <span className="text-white font-bold uppercase tracking-widest text-sm">
              Dashboard
            </span>
          </div>
          <button
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
            className="text-zinc-500 hover:text-white font-bold text-sm"
          >
            Logout
          </button>
        </nav>

        <main className="max-w-4xl mx-auto w-full p-8 py-16 space-y-12 flex-1">
          <header className="space-y-2">
            <h1 className="text-white text-4xl font-bold">Welcome back.</h1>
            <p className="text-zinc-500 text-lg">
              Managed experience for <strong>{user?.email}</strong>
            </p>
          </header>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="card space-y-4">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Account Details
              </p>
              <div className="space-y-1">
                <p className="text-white font-bold">{user?.email}</p>
                <p className="text-brand-orange text-xs font-bold uppercase">
                  {user?.role} Role
                </p>
              </div>
            </div>

            <div className="card space-y-4 flex flex-col justify-between">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Test Access Rules
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">Block Dashboard</span>
                <button
                  onClick={() => setBlockDashboard(!blockDashboard)}
                  className={`custom-switch ${blockDashboard ? "bg-red-600" : "bg-zinc-700"}`}
                >
                  <span
                    className={`custom-switch-dot ${blockDashboard ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>
            </div>
          </div>

          <Link
            to="/admin"
            className="block card hover:border-brand-orange transition-all group"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-white font-bold text-xl group-hover:text-brand-orange transition-colors">
                  Admin Portal
                </h3>
                <p className="text-zinc-500 text-sm">
                  Test advanced role-based restrictions.
                </p>
              </div>
              <span className="text-zinc-700 group-hover:translate-x-1 transition-transform group-hover:text-brand-orange">
                →
              </span>
            </div>
          </Link>
        </main>
      </div>
    </RailBoundary>
  );
}
