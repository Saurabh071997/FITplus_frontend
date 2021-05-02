import { useWindowSize } from "../context/useWindowSize";
import { Link, NavLink } from "react-router-dom";

import user_icon from "../images/user-icon.svg";
import home from "../images/home_icon.svg";
import watch_icon from "../images/watch_later.svg";
import lib_icon from "../images/library.svg";
import wish_icon from "../images/wishlist.svg";
import { useAuth } from "../context/AuthProvider";

function SignIn() {
  return (
    <div>
      <NavLink to="/login">
        <button className="btn-sign-in"> sign in</button>
      </NavLink>
    </div>
  );
}

function DisplayProfile() {
  return (
    <NavLink to="/profile">
      <button type="button" className="btn-icon">
        <img
          src={user_icon}
          title="Account"
          className="img30x30"
          alt="user_icon"
        />
      </button>
    </NavLink>
  );
}

export function DesktopNavigation() {
  const {
    authState: { userLoggedIn }
  } = useAuth();
  return (
    <div style={{ margin: "0rem", padding: "0rem" }}>
      <div className="nav-mob-top">
        <div className="nav-mob-logo">FITplus</div>

        <div style={{ display: "flex" }}>
          <NavLink to="/">
            <button type="button" className="btn-icon">
              <img src={home} title="Home" className="img30x30" alt="home" />
            </button>
          </NavLink>

          <NavLink to="/playlist">
            <button type="button" className="btn-icon">
              <img
                src={lib_icon}
                title="Playlist"
                className="img30x30"
                alt="lib_icon"
              />
            </button>
          </NavLink>

          <NavLink to="/watchlater">
            <button type="button" className="btn-icon">
              <img
                src={watch_icon}
                title="Watch Later"
                className="img30x30"
                alt="watch_icon"
              />
            </button>
          </NavLink>

          <NavLink to="/likedvideo">
            <button type="button" className="btn-icon">
              <img
                src={wish_icon}
                title="Liked Videos"
                className="img30x30"
                alt="wish_icon"
              />
            </button>
          </NavLink>

          {userLoggedIn ? <DisplayProfile /> : <SignIn />}
        </div>
      </div>
    </div>
  );
}

export function MobileNavigation() {
  const {
    authState: { userLoggedIn }
  } = useAuth();
  return (
    <div className="nav-mob">
      <div className="nav-mob-top">
        <div className="nav-mob-logo">FITplus</div>

        {userLoggedIn ? <DisplayProfile /> : <SignIn />}
      </div>
      <div className="nav-mob-bottom">
        <NavLink to="/">
          <button type="button" className="btn-icon">
            <img src={home} className="img30x30" alt="home_icon" />
          </button>
        </NavLink>

        <NavLink to="/watchlater">
          <button type="button" className="btn-icon">
            <img src={watch_icon} className="img30x30" alt="category_icon" />
          </button>
        </NavLink>

        <NavLink to="/playlist">
          <button type="button" className="btn-icon">
            <img src={lib_icon} className="img30x30" alt="wish_icon" />
          </button>
        </NavLink>

        <NavLink to="/likedvideo">
          <button type="button" className="btn-icon">
            <img src={wish_icon} className="img30x30" alt="cart_icon" />
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export function Navigation() {
  const [, width] = useWindowSize();
  return (
    <div
      style={{
        position: "sticky",
        top: "0em",
        zIndex: "10",
        marginBottom: "0.5rem"
      }}
    >
      {width <= 600 ? <MobileNavigation /> : <DesktopNavigation />}
    </div>
  );
}
