import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xl w-full space-y-10">
        <header className="space-y-6">
          <div className="flex justify-center">
            <img src="/authrail.png" alt="AuthRail" className="h-16 w-auto" />
          </div>
          <h1 className="text-white text-4xl font-extrabold tracking-tight">
            AuthRail
          </h1>
          <p className="text-zinc-500 text-lg">
            A simple demonstration of AuthRail's authentication and
            authorization logic.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard" className="btn-primary min-w-[160px]">
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
