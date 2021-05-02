import { useAuth } from "../context/AuthProvider";
import location from "../images/location-icon.svg";
import phone from "../images/phone-icon.svg";
import mail_icon from "../images/mail.svg";
import { useNavigate } from "react-router-dom";

export function UserProfile() {
  const {
    authState: { userLoggedIn, currentUser },
    logoutUser
  } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="profile-block">
      <div className="profile-img">
        <img
          src={currentUser?.profile}
          className="user-img"
          alt="profile-img"
        />
      </div>
      <div className="profile-name">{currentUser?.name}</div>

      <hr />
      <div className="profile-location">
        <img src={location} className="profile-info-img" alt="img" />
        {currentUser?.location}
      </div>
      <div className="profile-contact">
        <img src={phone} className="profile-info-img" alt="img" />
        {currentUser?.mobile_no}
      </div>
      <div className="profile-mail">
        <img src={mail_icon} className="profile-info-img" alt="img" />
        {currentUser?.mail}
      </div>

      <button
        className="btn-logout"
        onClick={() => {
          logoutUser();
          navigate("/");
        }}
      >
        Log out
      </button>
    </div>
  );
}
