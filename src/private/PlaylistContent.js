import { useParams, Link } from "react-router-dom";
import { useLibrary } from "../context/LibraryProvider";
import { VideoCard } from "../components/VideoCard";
import { videoList } from "../VideoList";

export function PlaylistContent() {
  const { playlistId } = useParams();
  const {
    libraryState: { playlist }
  } = useLibrary();

  const selectedPlaylist = playlist?.find(({ id }) => id === playlistId);

  // console.log("ID", id);
  // console.log("Name, ", name);
  // console.log("Videos", videos);

  return (
    <div className="page-layout">
      <div className="page-head">{selectedPlaylist?.name}</div>
      <div className="page-container">
        {selectedPlaylist?.videos.map((videoId) => {
          const video = videoList.find(({ id }) => id === videoId);
          return (
            <Link
              to={`/playlist/${selectedPlaylist?.id}/${video.id}`}
              key={video.id}
            >
              <VideoCard video={video} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
