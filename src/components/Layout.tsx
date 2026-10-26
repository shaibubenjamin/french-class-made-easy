import type { ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSession } from "../lib/session.tsx";

export default function Layout({ children }: { children: ReactNode }) {
  const { session, me, signOut } = useSession();
  const navigate = useNavigate();
  const ready = Boolean(me?.profile.onboarded && me.profile.current_level);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container">
          <Link to={session ? "/dashboard" : "/"} className="brand" aria-label="Parlons home">
            Parlons<span>.</span>
          </Link>
          {session && (
            <nav className="nav" aria-label="Main">
              {ready && (
                <>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                  <NavLink to="/lesson/today">Next lesson</NavLink>
                  <NavLink to="/lessons">All lessons</NavLink>
                  <NavLink to="/review">Review</NavLink>
                </>
              )}
              <NavLink to="/settings">Settings</NavLink>
              {me?.profile.is_admin && <NavLink to="/admin">Admin</NavLink>}
              <a
                href="/"
                onClick={async (e) => {
                  e.preventDefault();
                  await signOut();
                  navigate("/");
                }}
              >
                Sign out
              </a>
            </nav>
          )}
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer">
        <div className="container row spread">
          <span>© {new Date().getFullYear()} Parlons · Learn French, a little every day.</span>
          <Link to="/privacy">Privacy</Link>
        </div>
      </footer>
    </>
  );
}
