import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../lib/auth/authStore";
import { protect } from "authrail";
import { adminRail } from "../lib/rails/adminRail";

function AdminPage({
  allowAdmin,
  toggleAllow,
}: {
  allowAdmin: boolean;
  toggleAllow: () => void;
}) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="nav-bar">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <img src="/authrail.png" alt="Logo" className="h-8 w-auto" />
          </Link>
          <div className="h-4 w-px bg-zinc-800" />
          <div className="flex items-center gap-3">
            <span className="text-white font-bold uppercase tracking-widest text-[11px]">
              Admin Portal
            </span>
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tight border border-brand-orange/20">
              {user?.role}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange/20 text-brand-orange hover:text-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-200 group"
          >
            <span className="text-sm font-medium">Dashboard</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-0.5 transition-transform"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto w-full p-8 py-16 space-y-12 flex-1">
        <header className="space-y-2">
          <h1 className="text-white text-4xl font-bold">Admin Console.</h1>
          <p className="text-zinc-500 text-lg">
            Full administrative control and override settings.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="card space-y-4">
            <h2 className="text-white font-bold text-xl">System Management</h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              This area is protected by both role requirements and dynamic
              context overrides.
            </p>
          </div>

          <div className="card space-y-4 flex flex-col justify-between">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Global Override
            </p>
            <div className="flex items-center justify-between">
              <span className="text-white font-bold">Admin Clearance</span>
              <button
                onClick={toggleAllow}
                className={`custom-switch ${allowAdmin ? "bg-brand-orange" : "bg-zinc-700"}`}
              >
                <span
                  className={`custom-switch-dot ${allowAdmin ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdminWrapper() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [allowAdmin, setAllowAdmin] = useState(true);

  const ProtectedAdmin = protect(
    adminRail,
    () => ({ user, allowAdmin }),
    (to) => navigate(to),
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-zinc-500 font-bold">Verifying admin credentials...</p>
    </div>,
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-10">
      <div className="space-y-4">
        <h2 className="text-white text-5xl font-bold tracking-tight">
          Restricted.
        </h2>
        <p className="text-zinc-500 max-w-sm mx-auto">
          You need an <strong>Administrator</strong> role and an active{" "}
          <strong>Clearance Flag</strong> to enter this portal.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={() => {
            setAllowAdmin(true);
            if (user) {
              setUser({ ...user, role: "admin" });
            }
          }}
          className="btn-primary"
        >
          Grant Admin Clearance
        </button>
        <Link to="/dashboard" className="btn-outline">
          Return to Dashboard
        </Link>
      </div>
    </div>,
  )(AdminPage);

  return (
    <ProtectedAdmin
      allowAdmin={allowAdmin}
      toggleAllow={() => setAllowAdmin(!allowAdmin)}
    />
  );
}
