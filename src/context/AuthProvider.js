import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const user = {
  name: "Saurabh Kamboj",
  profile:
    "https://www.pngkit.com/png/detail/6-61591_batman-icon-jira-avatar.png",
  location: "Pune, India",
  mobile_no: "+91 7988505050",
  mail: "admin@mail.com",
  password: "admin"
};

export function fakeAuthApi(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === user.mail && password === user.password) {
        resolve({ success: true, status: 200 });
      }
      reject({ success: false, status: 401 });
    }, 1000);
  });
}

export function AuthProvider({ children }) {
  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("user"));
    loginStatus?.userLoggedIn &&
      setAuthState((authState) => ({
        ...authState,
        userLoggedIn: true,
        currentUser: loginStatus?.userCredentials
      }));
  }, []);

  const [authState, setAuthState] = useState({
    userLoggedIn: false,
    currentUser: null
  });

  async function loginUserWithCredentials(email, password) {
    try {
      const response = await fakeAuthApi(email, password);

      if (response.success) {
        setAuthState((authState) => ({
          ...authState,
          userLoggedIn: true,
          currentUser: user
        }));
        localStorage?.setItem(
          "user",
          JSON.stringify({
            userLoggedIn: true,
            userCredentials: user
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function logoutUser() {
    localStorage?.removeItem("user");
    localStorage?.removeItem("playlist");
    localStorage?.removeItem("likedVids");
    localStorage?.removeItem("watchLaterVids");
    localStorage?.removeItem("playlistId");

    setAuthState((authState) => ({
      ...authState,
      userLoggedIn: false,
      currentUser: null
    }));
  }

  return (
    <AuthContext.Provider
      value={{ authState, loginUserWithCredentials, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
