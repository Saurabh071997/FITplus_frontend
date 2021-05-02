import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { useWindowSize } from "./context/useWindowSize";
import { Home } from "./components/Home";
import { LoginPage } from "./components/LoginPage";
import { WatchLater } from "./private/WatchLater";
import { LikedVideos } from "./private/LikedVideos";
import { Playlist } from "./private/Playlist";
import { PrivateRoute } from "./components/PrivateRoute";
import { VideoDisplay } from "./components/VideoDisplay";
import { UserProfile } from "./private/UserProfile";
import { PlaylistContent } from "./private/PlaylistContent";

export default function App() {
  const [, width] = useWindowSize();

  return (
    <div className="App">
      <Navigation />

      <div style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/video/:videoId" element={<VideoDisplay />} />
          <PrivateRoute path="/watchlater" element={<WatchLater />} />
          <PrivateRoute path="/likedvideo" element={<LikedVideos />} />
          <PrivateRoute path="/playlist" element={<Playlist />} />
          <PrivateRoute path="/profile" element={<UserProfile />} />
          <PrivateRoute
            path="/likedvideo/:videoId"
            element={<VideoDisplay />}
          />
          <PrivateRoute
            path="/watchlater/:videoId"
            element={<VideoDisplay />}
          />
          <PrivateRoute
            path="/playlist/:playlistId"
            element={<PlaylistContent />}
          />
          <PrivateRoute
            path="/playlist/:playlistId/:videoId"
            element={<VideoDisplay />}
          />
        </Routes>
      </div>

      {/* <VideoDisplay /> */}

      <Footer />
      {width < 600 && (
        <div style={{ height: "10vh", backgroundColor: "#171717" }}></div>
      )}
    </div>
  );
}
