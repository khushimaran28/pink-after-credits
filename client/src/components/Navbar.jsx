import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
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
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    const confirm = window.confirm("Leaving already, gorgeous?");
    if (!confirm) return;

    logout();
    toast.success("You’ve been logged out 💋");
     
    if (location.pathname !== "/") {
      navigate("/login");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          onClick={() => user && navigate("/explore")}
          disabled={!user}
        />

        <NavItem
          icon={<LuMessageCircle />}
          label="Connect"
          active={active === "connect"}
          onClick={() => user && navigate("/connect")}
          disabled={!user}
        />

        <NavItem
          icon={<LuFilm />}
          label="After the Credits"
          active={active === "after-credits"}
          onClick={() => user && navigate("/after-the-credits")}
          disabled={!user}
        />
      </div>

      {/* RIGHT: PROFILE */}
      <div className="navbar__profile">
        {user ? (
          <div className="navbar__dropdown-wrapper" ref={dropdownRef}>
            <NavItem
              icon={<LuUser />}
              label="You"
              onClick={() => setShowDropdown((prev) => !prev)}
            />

            {showDropdown && (
              <div className="navbar__dropdown">
                <button onClick={() => navigate("/profile")}>Profile</button>
                <button onClick={() => navigate("/dashboard")}>Dashboard</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
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
function NavItem({ icon, label, active, onClick, disabled }) {
  return (
    <div
      className={`navbar__item
        ${active ? "active" : ""}
        ${disabled ? "disabled" : ""}`}
      onClick={!disabled? onClick: undefined}
    >
      <div className="navbar__icon">{icon}</div>
      <span className="navbar__label">{label}</span>
    </div>
  );
}