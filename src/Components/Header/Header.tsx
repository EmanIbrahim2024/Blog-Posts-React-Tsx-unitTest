import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import "./Header.css";
import logoImg from "../../assets/imges/logo.png";
import { stateType } from "Components/Types";

function Header() {
  const user = useSelector((state: stateType) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <header>
        <div>
          <img src={logoImg} />
        </div>
        <nav>
          {user ? (
            <>
              <NavLink to="/dashboard">
                <p> Dashboard </p>
              </NavLink>
              <NavLink to="/posts">
                <p> All Posts </p>
              </NavLink>
              <NavLink to="/new-post">
                {" "}
                <p> New Post </p>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <button> Login </button>
              </NavLink>
              <NavLink to="/signup">
                {" "}
                <button> Signup </button>{" "}
              </NavLink>
            </>
          )}
        </nav>

        <>{user && <button onClick={handleLogout}>Logout</button>}</>
      </header>
    </div>
  );
}

export default Header;
