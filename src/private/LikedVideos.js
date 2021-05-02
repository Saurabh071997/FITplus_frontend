import { useLibrary } from "../context/LibraryProvider";
import { videoList } from "../VideoList";
import { VideoCard } from "../components/VideoCard";
import { Link } from "react-router-dom";

export function LikedVideos() {
  const {
    libraryState: { likedVideos }
  } = useLibrary();
  return (
    <div className="page-layout">
      <div className="page-head">Liked Videos</div>
      <div className="page-container">
        {likedVideos.map((videoId) => {
          const video = videoList.find(({ id }) => id === videoId);
          return (
            <Link to={`/likedvideo/${video.id}`} key={video.id}>
              <VideoCard video={video} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
