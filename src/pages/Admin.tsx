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
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="nav-bar">
        <div className="flex items-center gap-4">
          <img src="/authrail.png" alt="Logo" className="h-8 w-auto" />
          <div className="h-4 w-px bg-zinc-800" />
          <span className="text-white font-bold uppercase tracking-widest text-sm">
            Admin Portal
          </span>
        </div>
        <Link
          to="/dashboard"
          className="text-zinc-500 hover:text-white font-bold text-sm"
        >
         Dashboard
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto w-full p-8 py-16 space-y-12 flex-1">
        <header className="space-y-2">
          <h1 className="text-white text-4xl font-bold italic">
            Admin Console.
          </h1>
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

        <div className="card bg-zinc-900/30 border-dashed">
          <p className="text-zinc-600 text-sm text-center italic">
            All interactions in this console are logged and audited via AuthRail
            proxy.
          </p>
        </div>
      </main>
    </div>
  );
}

export default function AdminWrapper() {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Set to true by default as requested at Step 396
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
        <h2 className="text-white text-5xl font-bold tracking-tight italic">
          Restricted.
        </h2>
        <p className="text-zinc-500 max-w-sm mx-auto">
          You need an <strong>Administrator</strong> role and an active{" "}
          <strong>Clearance Flag</strong> to enter this portal.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button onClick={() => setAllowAdmin(true)} className="btn-primary">
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
