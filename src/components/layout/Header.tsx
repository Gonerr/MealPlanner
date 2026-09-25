"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { CalendarDays, ChefHat, LogOut, Settings2 } from "lucide-react";

type HeaderUser = {
  name?: string;
  email?: string;
  role?: string;
};

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = React.useState<HeaderUser | null>(null);

  React.useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const userLabel = user?.name || user?.email?.split("@")[0] || "Мой профиль";
  const userInitial = userLabel.slice(0, 1).toUpperCase();

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link href="/" className="brand" aria-label="NeМеню — на главную">
          <span className="brand__mark">
            <ChefHat size={21} strokeWidth={2.2} aria-hidden="true" />
          </span>
          <span className="brand__name">
            Ne<span>Меню</span>
          </span>
          <span className="brand__dot" />
        </Link>

        {user && (
          <nav className="app-nav" aria-label="Основная навигация">
            <Link
              href="/"
              className={`app-nav__link ${pathname === "/" ? "is-active" : ""}`}
            >
              <CalendarDays size={17} aria-hidden="true" />
              <span>Моё меню</span>
            </Link>

            {user.role === "admin" && (
              <Link
                href="/admin"
                className={`app-nav__link ${
                  pathname?.startsWith("/admin") ? "is-active" : ""
                }`}
              >
                <Settings2 size={17} aria-hidden="true" />
                <span>Настройки</span>
              </Link>
            )}
          </nav>
        )}

        <div className="app-header__account">
          {user && (
            <>
              <div className="account-chip" title={user.email}>
                <span className="account-chip__avatar">{userInitial}</span>
                <span className="account-chip__name">{userLabel}</span>
              </div>
              <button
                type="button"
                className="icon-action"
                onClick={handleLogout}
                aria-label="Выйти"
                title="Выйти"
              >
                <LogOut size={18} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
