import { useLibrary } from "../context/LibraryProvider";
import { VideoCard } from "../components/VideoCard";
import { videoList } from "../VideoList";
import { Link } from "react-router-dom";

export function WatchLater() {
  const {
    libraryState: { watchLaterVideos }
  } = useLibrary();
  return (
    <div className="page-layout">
      <div className="page-head">Saved Videos</div>
      <div className="page-container">
        {watchLaterVideos?.map((videoId) => {
          const video = videoList.find(({ id }) => id === videoId);
          return (
            <Link to={`/watchlater/${video.id}`} key={video.id}>
              <VideoCard video={video} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
