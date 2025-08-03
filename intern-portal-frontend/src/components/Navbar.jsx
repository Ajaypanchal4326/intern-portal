import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("dashboardData");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo" onClick={() => navigate("/dashboard")}>
          <img
            src="./logo192.png"
            alt="Intern Portal Logo"
            className="logo-img"
          />
        </div>
        <div className="nav-links">
          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            Home
          </Link>
          <Link
            to="/leaderboard"
            className={location.pathname === "/leaderboard" ? "active" : ""}
          >
            Leaderboard
          </Link>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-user">
          <img
            src="https://ui-avatars.com/api/?name=Intern"
            alt="User Avatar"
            className="navbar-avatar"
          />
          <span className="navbar-username">Intern</span>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
