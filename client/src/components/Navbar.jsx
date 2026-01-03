import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext";
import {
  LuHouse,
  LuSearch,
  LuMessageCircle,
  LuFilm,
  LuUser,
} from "react-icons/lu";

export default function Navbar({ active }) {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`navbar ${showNavbar ? "navbar--visible" : "navbar--hidden"}`}
    >
      {/* LEFT: LOGO */}
      <div className="navbar__logo" onClick={() => navigate("/")}>
        <img src="/logo.png" alt="Pink After Credits" />
      </div>

      {/* CENTER: NAV ICONS */}
      <div className="navbar__content">
        <NavItem
          icon={<LuHouse />}
          label="Home"
          active={active === "home"}
          onClick={() => navigate("/")}
        />

        <NavItem
          icon={<LuSearch />}
          label="Explore"
          active={active === "explore"}
          onClick={() => navigate("/explore")}
        />

        <NavItem
          icon={<LuMessageCircle />}
          label="Connect"
          active={active === "connect"}
          onClick={() => navigate("/connect")}
        />

        <NavItem
          icon={<LuFilm />}
          label="After the Credits"
          active={active === "after-credits"}
          onClick={() => navigate("/after-the-credits")}
        />
      </div>

      {/* RIGHT: PROFILE */}
      <div className="navbar__profile">
        {user ? (
          <>
            <NavItem
              icon={<LuUser />}
              label="Profile"
              onClick={() => navigate("/profile")}
            />
            <button className="navbar__logout" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <NavItem
            icon={<LuUser />}
            label="Login"
            onClick={() => navigate("/login")}
          />
        )}
      </div>
    </nav>
  );
}

/* Reusable nav item */
function NavItem({ icon, label, active, onClick }) {
  return (
    <div
      className={`navbar__item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="navbar__icon">{icon}</div>
      <span className="navbar__label">{label}</span>
    </div>
  );
}