import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/AuthSliceAndtest/authSlice";
import "./Header.css";
import logoImg from "../../assets/imges/logo.png";
import { stateType } from "Components/Types";

function Header() {
  //get the user which store in localstorage
  const user = useSelector((state: stateType) => state.auth.user);
  const dispatch = useDispatch();

  //Clicking logout button get the fn to remove the user from local storage
  const handleLogout = () => {
    dispatch(logout());
  };

  //the header apperance is change according to there is a user loged in or not
  return (
    <div>
      <header>
        <div>
          <img src={logoImg} alt="Join us logo" />
        </div>
        <nav role="navigation">
          {user ? (
            <>
              <ul className="header-list">
                <li>
                  <NavLink to="/dashboard">
                     Dashboard 
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/posts">
                     All Posts 
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/new-post">
                     New Post 
                  </NavLink>
                </li>
              </ul>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-button">
                Login
              </NavLink>

              <NavLink to="/signup" className="nav-button">
                SignUp
              </NavLink>

             
            </>
          )}
        </nav>

        {user && <button onClick={handleLogout} className="nav-button">Logout</button>}
      </header>
    </div>
  );
}

export default Header;
