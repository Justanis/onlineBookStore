import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const navLinks = [
  { label: "books", href: "/books" },
  { label: "features", href: "/features" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];

const isActiveRoute = (pathname, href) => {
  if (href === "/") {
    return pathname === href;
  }
  return pathname.startsWith(href);
};

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    return (
        <nav className="w-full bg-amber-950 px-4 py-3">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/30 bg-amber-950/80 px-4 py-2 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/40 bg-white/5">
                        <span className="block h-3 w-3 rotate-45 border border-white/80" />
                    </div>
                    <div className="leading-none">
                        <p className="text-sm font-semibold">Bookstore</p>
                        <p className="text-xs text-white/60">Name</p>
                    </div>
                </div>

                <div className="hidden items-center gap-2 md:flex">
                    {navLinks.map((link) => {
                        const active = isActiveRoute(location.pathname, link.href);
                        return (
                            <button
                                key={link.href}
                                type="button"
                                onClick={() => navigate(link.href)}
                                className={`rounded-full border px-4 py-1.5 text-sm capitalize transition ${
                                    active
                                        ? "border-sky-400 text-sky-200"
                                        : "border-white/30 text-white/80 hover:text-white"
                                }`}
                            >
                                {link.label}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-3">
                    {!user ? (
                        <>
                            <button
                                type="button"
                                onClick={() => navigate("/signin")}
                                className="rounded-full border border-white/30 px-3 py-1.5 text-sm text-white/80 hover:text-white"
                            >
                                Sign In
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/signup")}
                                className="rounded-full border border-white/30 px-3 py-1.5 text-sm text-white/80 hover:text-white"
                            >
                                Sign up
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="flex items-center gap-3"
                        >
                            <div className="h-8 w-8 rounded-full border border-white/60 bg-white/20" />
                            <span className="text-sm text-white/80">{user.name}</span>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}